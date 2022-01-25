import { makeStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CoinPage from './pages/CoinPage';
import Home from './pages/Home'

import './App.css'

const App = () => {

  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor:'#14161a',
      minheight:'200vh',
      color:'white'
    }
  }))

  const classes = useStyles()

  return(
    <>
      <BrowserRouter>
        <div className={classes.App}>
          <Header/>
          <Routes>
            <Route exact path='/' element={ <Home/> }/>
            <Route exact path='/coins/:id' element={ <CoinPage/> }/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
};

export default App;
