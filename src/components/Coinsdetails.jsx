import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Coinchart from './Coinchart'
import coin from './bit-coin.jpg'
import {BiSolidUpArrow,BiSolidDownArrow} from 'react-icons/bi'
import {IoPulseOutline} from 'react-icons/io5'
import './header.css'
const Coinsdetails = () => {
  const {id}=useParams();
  const url=`https://api.coingecko.com/api/v3/coins/${id}`
  const [loading,setloading]=useState(true);
  const [data,setdata]=useState([]);
  const [currency, setcurrency]=useState('inr');
  useEffect(()=>{
    const getcoin=async()=>{
      const {data}=await axios(url);
      console.log(data); 
      setdata(data)
      setloading(false);
    }
    getcoin();
  },[currency])
  const profit=data.market_data?.price_change_percentage_24h>0;
  console.log(currency)
  return (
    <>
  {
    loading?<loader/>:
    <>
     <div className="btn">
        <button className='cur-btn' onClick={()=>{setcurrency('inr')}}>INR</button>
        <button className='cur-btn' onClick={()=>{setcurrency('usd')}}>Dollar</button>
      </div>
    <div className='container'>

    <div className='container1'>
     <div className="last_update cont1">Last-updated on {data.last_updated}.</div>
     <div className="logo1 cont1"><img src={data.image.large} height={'100px'} alt="" /></div>
     <div className="coin cont1">{data.name}</div>
     <div className="coin_price cont1">{currency==='inr'?'₹'+data.market_data.current_price[currency]:'$'+data.market_data.current_price[currency]}</div>
     <div className="percentage cont1">{profit?<BiSolidUpArrow color='green' />:<BiSolidDownArrow color='red' />}
      {data.market_data.price_change_percentage_24h_in_currency[currency]}%</div>
     <div className="rank1 cont1">{<IoPulseOutline color='#FFC436'/>} #{data.market_data.market_cap_rank}</div>
     <div className="desc cont1">{data.description['en'].split('.')[0]}</div>
   </div>
   <div className='chart1'>
    <Coinchart currency={currency} />
   </div>
    </div>
   </>
  }
  </>
  )
}

export default Coinsdetails
