import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import {TrendingCoins} from '../../config/api'
import {CryptoState} from '../../CryptoContext'
import "react-alice-carousel/lib/alice-carousel.css";
import { LinearProgress } from '@material-ui/core';

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const Carousel = () => {
    const [trending, setTrending] = useState([])
    const { currency, symbol } = CryptoState()
    console.log(trending)
    useEffect(() => {
        const fetchData = async ()=>{
            const {data} = await axios.get(TrendingCoins(currency))
            setTrending(data)
        }
        fetchData()
    }, [currency]);

    const items = trending.map((coin)=>{
        return(
            <Link to={`/coins/${coin.id}`} style={{textDecoration:'none'}} >
                <img
                    src={coin.image}
                    alt={coin.name}
                    width="35%"
                    style={{marginTop:'25%'}}
                />
                <div style={{color:'gold', decoration:'none', display:'flex', flexDirection:'column'}}>
                    <span><span style={{color:'white', fontSize:'25px'}}>{coin.symbol.toUpperCase()}</span>&nbsp;&nbsp;<span style={{color:coin.price_change_percentage_24h<0?'red':'#21c43a', fontSize:'25px'}} >{coin.price_change_percentage_24h>=0&&"+"}{(coin.price_change_percentage_24h)}</span></span>
                    <span style={{color:'white', fontSize:'35px'}} >{symbol}&nbsp;{numberWithCommas(coin.current_price.toFixed(2))}</span>
                </div>
                
            </Link>
        )
    })
    
    const responsive = {
        0:{
            items:1
        },
        512:{
            items:4
        }
    }
    if(trending.length===0)
        return <LinearProgress style ={{background:'gold'}} buffer={0.9} progress={0.8}/>
    return (
        <>
            <AliceCarousel
                mouseTracking
                animationDuration={1500}
                infinite
                autoPlayInterval={1000}
                disableDotsControls
                responsive={responsive}
                autoPlay
                disableButtonsControls
                items={items}
            />
        </>
    )
};

export default Carousel;
