import React from "react";
import Heading from "../../common/Heading";
import { location } from "../../data/Data";
import "./style.css";

const Location = () => {
  return (
    <>
      <section className="location padding">
        <div className="container">
          <Heading
            title="Explore Job and Internship Opportunities by Companies"
            subtitle="Discover exciting job and internship opportunities in various Companies."
          />

          <div className="content grid3 mtop">
            {location.map((item, index) => (
              <div className="box" key={index}>
                <img src={item.cover} alt={item.name} />
                <div className="overlay">
                  <h5>{item.name}</h5>
                  <p>
                    <label>Jobs: {item.Jobs}</label>
                    <label>Internships: {item.Internships}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;
