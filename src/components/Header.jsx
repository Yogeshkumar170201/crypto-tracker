import { AppBar, Container, makeStyles, Typography, Select, Toolbar, MenuItem } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
    const useStyles = makeStyles((theme) => ({
        title: {
          flexGrow: 1,
          color:"gold",
          fontWeight:"bold",
          fontFamily: 'Montserrat',
          cursor:'pointer',
          marginTop:'1%'
        },
        App:{
            height:'10%'
        }
    }));

    const theme = createTheme({
        palette: {
          primary: {
            main: '#ffff',
          },
          type:'dark'
        },
    })

    const classes = useStyles()

    const { currency, setCurrency } = CryptoState()
    const navigate = useNavigate()
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar position='static' color='transparent' className={classes.App}>
                    <Container>
                        <Toolbar>
                            <Typography variant="h5" className={classes.title} onClick={()=>navigate('/')} >
                                Crypto Tracker
                            </Typography>
                            <Select variant='outlined' labelId="demo-simple-select-label" id="demo-simple-select" value={currency} onChange={(e)=>setCurrency(e.target.value)} style={{ width: 100, height: 50, marginLeft: 15 }} >
                                <MenuItem value={"INR"} >INR</MenuItem>
                                <MenuItem value={"USD"} >USD</MenuItem>
                            </Select>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </>
    )
};

export default Header;
