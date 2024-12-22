import React, { useEffect, useState } from 'react'
import BusInfoCard from './BusInfoCard';
import './BusInfoCard.css'

const BusInfo = () => {
    
    const [datas,setData] = useState([]); //store fetched data
    const [loading,setLoding] = useState(true); //Track Loading State
    const [error,setError] = useState(null); // Track errors

    //backend GET data fetch
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch('http://localhost:5000/businfo')
            if(!response.ok){
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);//saved data to state
            }catch(err){
                setError(err.message);//handle error
            } finally{
                setLoding(false)//Stop loading indicate
            }
        };
        fetchData();
    },[]) 

    if(loading) return <span className="loading loading-infinity loading-lg"></span>
    if(error) return <p className='text-rose-600'>Error:{error}</p>
console.log(datas)
  return (
    <div className='grid gap-4 grid-row-1'>
      
      <p>Id:{datas.length}</p>
      {
      datas.map(data=><BusInfoCard key={data._id} data={data} setData={setData}></BusInfoCard>)
      }
    </div>
  )
}

export default BusInfo