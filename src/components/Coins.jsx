import React,{useState,useEffect} from 'react'
import Loader from './Loader'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './header.css'
const Coins = () => {
  const [loader, setloader]=useState(true);
  const [search, setsearch]=useState('');
  const [coins, setcoins]=useState([]);
  const [currency, setcurrency]=useState('inr');
  const curr=currency==='inr'? '₹':'$';
  const url=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;
  useEffect(()=>{
    async function datafetchcoins(){
      
      const {data}=await axios(url)
      setcoins(data)
      setloader(false)
      console.log(data)
    }
    datafetchcoins();
  },[currency])
  console.log(search);
  return (
    <>
    
     {
      loader ?<Loader/>:<>
      <div className="extra">

      <div className="btn">
        <button className='cur-btn' onClick={()=>{setcurrency('inr')}}>INR</button>
        <button className='cur-btn' onClick={()=>{setcurrency('usd')}}>Dollar</button>
      </div>
      <div className='search_container'>
       <input className='searchbar' placeholder='Enter your coin name' onChange={(e)=>setsearch(e.target.value)} type="text" name="" id="" />
      </div>
      </div>
 
 <div className="box">

      <div className='container_ex'>
      {
        
coins.filter((det)=>{
  if(det=='')
  return det;
else if(det.name.toLowerCase().includes(search.toLowerCase()))
return det;

}).map((itemscoins,i)=>{
  return (
    <Coins_data itemscoins={itemscoins} i={i} id={itemscoins.id} curr={curr}/>
    )   
  }
  )
}
      </div>
     </div>
      </> 
     }
    </>
  )
}

const Coins_data=({itemscoins,i,curr,id})=>{
  const profit=itemscoins.market_cap_change_percentage_24h;
  return (
    <Link to={`/coins/${id}`}>
  <div className="ex-cards ex-coins">
  <div className="image">
    <img height={'80px'} className='image-icon' src={itemscoins.image} alt="" />
  </div>
  <div className="name">{itemscoins.name}</div>
  <div className="price">{curr}{itemscoins.current_price}</div>
  <div style={profit>0?{color:'green'}:{color:'red'}} className="rank">{profit>0?'+'+itemscoins.market_cap_change_percentage_24h+'%':itemscoins.market_cap_change_percentage_24h+'%'}</div>
</div>
    </Link>
  )
}

export default Coins
