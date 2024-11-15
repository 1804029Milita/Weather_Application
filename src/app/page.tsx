"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import DehazeIcon from '@mui/icons-material/Dehaze';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import LightModeIcon from '@mui/icons-material/LightMode';

let WEATHER_API_KEY= process.env.NEXT_PUBLIC_WEATHER_API_KEY
export default function Home() {
  const [place, setPlace]= useState("Gaibandha")
  const [placeData, setPlaceData]= useState<any>(null)
  const currentTime= new Date().toLocaleTimeString([],{
    hour:'2-digit',
    minute: '2-digit',
  })

  const getWeather = async() =>{
    if(place && place.length>0){
      try{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${WEATHER_API_KEY}`
        let res= await fetch(url);
        let data= await res.json();
        console.log("GET WEATHER DATA ",data)
        setPlaceData(data)
      }
      catch(err){
        console.log(err)
      }
    }
  }

  useEffect(()=>{
    getWeather();

  },[])
  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input type="search" placeholder="City Name" onChange={(e)=> setPlace(e.target.value)}></input>
        <button onClick={getWeather}><SearchIcon></SearchIcon></button>
      </div>
      {
        placeData && <div className={styles.row}>
          <div className={styles.section1}>
            <div className={styles.section11}>
              {
                placeData.weather[0].main==='Clouds' && 
                <ThunderstormIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main==='Haze' && 
                <DehazeIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main==='Smoke' && 
                <VapingRoomsIcon className={styles.weathericon}/>
              }
              {
                placeData.weather[0].main==='Sunny' && 
                <LightModeIcon className={styles.weathericon}/>
              }
              <p className={styles.temp}>{(placeData?.main.temp-273.15).toFixed(1)}<span>°C</span></p>

            </div>
            <div className={styles.section11}>
              <p className={styles.city}>{placeData?.weather[0].main}</p>
            </div>
          </div>

          <div className={styles.timediv}>
            <p className={styles.time}>{currentTime}</p>
          </div>
        </div>
      }
      {
        placeData && 
        <div className={styles.section2}>
          <div className={styles.section21}>
        <p className={styles.head1}>Temperature</p>
        <p className={styles.head2}>{(placeData?.main.temp-273.15).toFixed(1)}<span>°C</span></p>
        </div>
        <div className={styles.section21}>
        <p className={styles.head1}>Temperature Min</p>
        <p className={styles.head2}>{(placeData?.main.temp_min-273.15).toFixed(1)}<span>°C</span></p>
        </div>
        <div className={styles.section21}>
        <p className={styles.head1}>Temperature Max</p>
        <p className={styles.head2}>{(placeData?.main.temp_max-273.15).toFixed(1)}<span>°C</span></p>
        </div>
        <div className={styles.section21}>
        <p className={styles.head1}>Temperature</p>
        <p className={styles.head2}>{placeData?.main.humidity}</p>
        </div>
        <div className={styles.section21}>
        <p className={styles.head1}>Pressure</p>
        <p className={styles.head2}>{placeData?.main.Pressure}</p>
        </div>
        <div className={styles.section21}>
        <p className={styles.head1}>Visibility</p>
        <p className={styles.head2}>{placeData?.main.Visibility}</p>
        </div>
        <div className={styles.section21}>
        <p className={styles.head1}>Wind Speed</p>
        <p className={styles.head2}>{placeData?.main.windspeed} km/hr</p>
        </div>
        </div>
      }

      
    </div>
    
      
  );
}
