import React from "react"
// import { list1 } from "../../data/Data"

const RecentCard = ({ list }) => {
  console.log(list);

  return (
    <>
      <div className='content grid3 mtop'>
        {(list || []).map((val, index) => {
          { console.log(val) }
          const { image_urls, area_sqft, location, name, price_per_sqft, type } = val;
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={image_urls[0]} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: area_sqft === "For Sale" ? "#25b5791a" : "#ff98001a", color: area_sqft === "For Sale" ? "#25b579" : "#ff9800" }}>{area_sqft}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price_per_sqft
                  }</button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
