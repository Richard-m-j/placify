import React from "react"
// import { list1 } from "../../data/Data"

const RecentCard = ({ list }) => {
  console.log(list);

  return (
    <>
      <div className='content grid3 mtop'>
        {(list || []).map((val, index) => {
          { console.log(val) }
          const {  salary, title, name,  branch } = val;
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                {/* <img src={image_urls[0]} alt='' /> */}
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: salary === "For Sale" ? "#25b5791a" : "#ff98001a", color: salary === "For Sale" ? "#25b579" : "#ff9800" }}>{salary}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {title}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{salary
                  }</button> <label htmlFor=''>/month</label>
                </div>
                <span>{branch}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
