import React,{useEffect,useState} from 'react'
import Loader from './Loader';
import axios from 'axios';
import '../components/Exchanges.css'

const Exchanges = () => {
  const [loader, setloader]=useState(true);
  const [exchangesdata, setexchanges]=useState([])
  const url='https://api.coingecko.com/api/v3/exchanges';
  useEffect(  ()=>{
    async function datafetch(){

      const {data}=await axios(url)
      
      setexchanges(data);
      setloader(false)
    
    }
    datafetch();
    },[])
  return (
    <>
     <div className="box">

     {
       loader ?<Loader/>:<>
      <div className='container_ex'>
        {

          exchangesdata.map((items,i)=>{
           return (
            <div className="ex-cards">
            <div className="image">
              <img className='image-icon' src={items.image} alt="" />
            </div>
            <div className="name">{items.name}</div>
            <div className="price">{items.trade_volume_24h_btc.toFixed(0)
}</div>
            <div className="rank">{items.trust_score_rank}</div>
          </div>
          
           )   
          }
          )
        }
      </div>
      </> 
     }
       </div>
    </>
  )
}

export default Exchanges
