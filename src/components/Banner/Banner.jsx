import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

const useStyles = makeStyles({
    banner:{
        textAlign:'center',
        backgroundImage:"url(./bannerBack.jpg)",
        height:'95%',
        paddingBottom:'2%'
    },
    tagline:{
        paddingTop:'1%',
        fontFamily:'Montserrat'
    }
})

const Banner = () => {

    const classes = useStyles()

    return(
        <div className={classes.banner} >
            <Container>
                <Typography variant="h1" className={classes.tagline} > Crypto Tracker </Typography>
                Get all the information about  Crypto Currency
            </Container>
            <Carousel/>
        </div>
    )
};

export default Banner;
