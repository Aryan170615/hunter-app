import { makeStyles } from '@mui/styles'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';   // ✅ required

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
    height: "100%",
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([])
  const classes = useStyles();

  const { currency,symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (err) {
      console.error("Error fetching trending coins:", err);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
     return (<Link className={classes.carouselItem} to={`/coins/${coin.id}`} key={coin.id}>
      <img
        src={coin?.image}
        alt={coin.name}
        height="50"
        style={{ marginBottom: 5 }}
      />
      <span>
        {coin.symbol.toUpperCase()}
        &nbsp;
        <span 
         style={{ color: profit ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}
        >{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}% </span>

      </span>
      <span style={{ fontSize: 22, fontWeight: 500 }}>
        {symbol} {coin?.current_price.toLocaleString()}
      </span>
      <span style={{ fontSize: 14 }}>{coin.name}</span>
    </Link>
  
  )});

  return (
    <div className={classes.carousel}>
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel
