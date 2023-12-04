import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading";
import DropdownList from "react-widgets/DropdownList";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "react-widgets/styles.css";
import "./hero.css";
import RecentCard from "../recent/RecentCard.jsx";
import axios from "axios";
import Recent from "../recent/Recent.jsx";
const Hero = ({ uid }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [Location, setskill] = useState('');
  const handleskillChange = (event) => {
    setskill(event.target.value);
  };
  const [listingType, setListingType] = useState('Buy');
  const handleListingTypeChange = (event) => {
    setListingType(event.target.value);
  };
  const [type, settype] = useState('');
  const handletypeChange = (event) => {
    settype(event.target.value);
  };

  const [price, setprice] = useState();
  const [bedrooms, setbedrooms] = useState("");

  const toggleMoreMenu = (e) => {
    e.preventDefault();
    setShowMoreMenu(!showMoreMenu);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(Location);
    console.log(type);
    const response = await axios.get('http://localhost:3000/api/listing/listings/search', {
      params: {
        type,
        Location,
        price,
        bedrooms,
      },
      withCredentials: true,
    });
    // const response = await fetch('http://localhost:3000/api/listing/listings/search?type=' + encodeURIComponent(type) + '&Location=' + encodeURIComponent(Location),
    //   { credentials: 'include' },
    // );
    // const data = await response.json();

    setListings(response.data);
  };

  const searchListings = async () => {
    try {
      const userId = uid; // Replace with actual user ID
      const response = await fetch(`http://localhost:3000/api/user/listings/${userId}`, { credentials: 'include' });
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
      <section className="hero">
        <div className="container">
          <Heading
            title="Design Your Career "
            subtitle="Find internships and Jobs Suited for You"
          />

          <form className='flex' onSubmit={handleSubmit}>
            <div className='box '>
              <span>Interested Field</span>
              <input type='text' id="myInput" placeholder='' onChange={handleskillChange} />
              {/* <input type='text' id="myInput" placeholder='' value={skills} onChange={handleskillChange} /> */}

            </div>

            <div className='box'>
              <span>Branch</span>
              <DropdownList defaultValue="Branch" data={["", "Computer", "Electronics", "Electrical", "Mechanical","Civil"]} value={type} onChange={settype} />
            </div>
            <div className="additional">
              {/* <button className='btnmore' onClick={(e) => toggleMoreMenu(e)}>
                <h4>More</h4>
              </button> */}
              <button className='btn1'>
                <i className='fa fa-search'></i>
              </button>
            </div>
            {/* {showMoreMenu && (
              <>
                <div className='box'>
                  <span>Price Range</span>
                  <Box sx={{ width: 500 }}></Box>
                  <Slider size="small" defaultValue={3500000} aria-label="Small" valueLabelDisplay="auto" max={50000000} value={price} onChange={(e, newValue) => setprice(newValue)} />
                </div>
                <div className='box'>
                  <span>Bedrooms</span>
                  <DropdownList defaultValue="1" data={["", "1", "2", "3", "4", "5"]} value={bedrooms} onChange={(newValue) => setbedrooms(newValue)} />
                </div>
              </>
            )} */}
          </form>
        </div>
        <div>
          {/* <h2>Search Results</h2>
          <div className='content grid5 mtop'><ul>
            {searchResults.map((result, index) => (
              // <li key={index}>
              //   <h3>{result.title}</h3>
              //   <p>{result.description}</p>
              //   <p>{result.price}</p>
              //   <p>{result.address}</p>
              // </li>
              <div className='box' key={index}>

                <h3>{result.name}</h3>
                <p>{result.description}</p>
                <p>{result.price}</p>
                <p>{result.address}</p>
              </div>
            ))}
          </ul></div> */}

        </div>
      </section>
      <Recent searchResults={listings} heading={"Search Results"} />
    </>

  );
};
export default Hero;
