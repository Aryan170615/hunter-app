import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const CryptoContext = createContext();

const CryptoContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);

  // 🔹 Fetch all coins from CoinGecko API
  const fetchCoins = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // 🔹 Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Watchlist listener
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins || []);
        } else {
          setWatchlist([]);
        }
      });

      return () => unsubscribe();
    } else {
      setWatchlist([]);
    }
  }, [user]);

  // 🔹 Currency symbol change
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        user,
        watchlist,
        setWatchlist,
        coins,
        setCoins, // ✅ added this
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContextProvider;

export const CryptoState = () => useContext(CryptoContext);
