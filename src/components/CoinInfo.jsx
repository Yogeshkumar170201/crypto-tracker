import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import { CircularProgress, Button, createTheme, ThemeProvider } from '@material-ui/core';
import {chartDays} from '../config/daysData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


const CoinInfo = ({coin}) => {

    const [days, setDays] = useState(1)
    const [historicalData, setHistoricalData] = useState()
    const {currency} = CryptoState()
    
    useEffect(() => {
        const Data = async ()=>{
            const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
            console.log(data)
            setHistoricalData(data.prices)
        }
        Data()
    }, [coin.id, days, currency]);
    
    if(!historicalData)
        return <CircularProgress
            style={{color:'gold'}}
            thickness={1}
            size={250}
        />
    return (
      <ThemeProvider theme={darkTheme}>
        <>
          <div style={{padding:'2%', alignText:'center'}}>
            <Line
              data={{
                labels:historicalData.map((coin)=>{
                  let date = new Date(coin[0])
                  let time = date.getHours()>12? 
                  `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets:[
                  {
                    data:historicalData.map((coin)=>{
                      return coin[1]
                    }),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  }
                ]
              }}
              options= {{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </div>
          <div style={{marginTop:'2%', display: 'flex', flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-evenly', paddingBottom:'5%', alignItems: 'center'}}>
            {
              chartDays.map((dD)=>{
                return <Button variant="outlined" color="primary" style={{backgroundColor:'#EEBC1D', color:'black', fontWeight:'bold', fontSize:'25px' , fontFamily:'Roboto', width:'200px', height:'70px', marginTop:'2%',  }} value={dD.value} onClick={()=>setDays(dD.value)} >
                  {dD.label}
                </Button>
              })
            }
          </div>
        
        </>
      </ThemeProvider>
    )
};

export default CoinInfo;

