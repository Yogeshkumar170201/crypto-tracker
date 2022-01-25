import { LinearProgress, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api'
import {CryptoState} from '../CryptoContext'


const CoinPage = () => {

  const [coin, setCoin] = useState()

  const {id} = useParams()

  const {currency, symbol} = CryptoState()

  useEffect(() => {
    const getCoin = async()=>{
      const { data } = await axios.get(SingleCoin(id))
      console.log(data)
      setCoin(data)
    }
    getCoin()
  }, [id]);

  if(!coin)
    return <LinearProgress style ={{background:'gold'}} buffer={0.9} progress={0.8}/>

  return (
      <> 
          <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center', paddingTop:'2%'}}>
            <img
              src={coin.image.large}
              alt={coin.name}
              width="200px"
              style={{ alignSelf:'center'}}
            />
            <Typography variant="h2" >{coin.name}</Typography>
            <Typography variant="h5">{"Rank : "}{coin.market_cap_rank}</Typography>
            <Typography variant="h5">{"Current Price : "}{symbol}&nbsp;{coin.market_data.current_price[currency.toLowerCase()].toFixed(2)}</Typography>
            <Typography variant="h5">{"Market Cap : "}{symbol}&nbsp;{coin.market_data.market_cap[currency.toLowerCase()].toFixed(2).slice(0, -6)}{"M"}</Typography>
          </div>
          <div style={{marginTop:'10%', alignSelf:'center'}}>
            <CoinInfo coin = {coin}/>
          </div>
      </>
  )
};

export default CoinPage;
