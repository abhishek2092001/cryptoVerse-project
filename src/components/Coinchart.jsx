import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './header.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const Coinchart = ({currency}) => {
    const [days, setdays]=useState(1)
    const {id}=useParams();
    const url=`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    const [chartdata,setchartdata]=useState([]);
    useEffect(()=>{
        const chart=async()=>{
   const {data}=await axios(url);
   setchartdata(data.prices)
   console.log(data.prices)
    }
    chart();
    },[currency,days])

    const mydata={
        labels: chartdata.map((value)=>{
            const date=new Date(value[0]);
            const time=date.getHours()>12?`${date.getHours()-12}:${date.getMinutes()}PM`:`${date.getHours()}:${date.getMinutes()}AM`
             return days===1? time:date.toLocaleDateString()
        }) ,
        datasets:[
            { 
                labels: `price in past days ${days} in ${currency}`,
                data: chartdata.map((value)=>value[1]),
                borderColor:'orange',
                borderWidth:'1' 
            }
        ]
    }
  return (
    <div>
      <Line data={mydata} options={{
        elements:{
            point:{
                radius:1.3,
            }
        }
      }}/>
      <div className="btns">
        <button className='btns-time' onClick={()=>{setdays(1)}}>24 hours</button>
        <button className='btns-time' onClick={()=>{setdays(30)}}>1 month</button>
        <button className='btns-time' onClick={()=>setdays(365)}>1 year</button>
      </div>
    </div>
  )
}

export default Coinchart
