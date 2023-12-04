import React from "react";
import { useState, useEffect } from "react";

import Featured from "./featured/Featured";
import Hero from "./hero/Hero";
import Location from "./location/Location";
import Recent from "./recent/Recent";
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const uid = location.state.uid;
  const [searchResults, setSearchResults] = useState([]);
  const searchListings = async () => {
    try {
      const userId = uid; // Replace with actual user ID
      const response = await fetch(`http://localhost:3000/api/listing/listings/get`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
      console.log(searchResults);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    // Fetch search results when component mounts
    searchListings();
  }, []);

  return (
    <>
      <Hero uid={uid} />
      <Featured />
      <Recent searchResults={searchResults} heading={"All Listings"} />
      <Location />
    </>
  );
};

export default Home;
