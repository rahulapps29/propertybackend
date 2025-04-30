import React from "react";
import "./Biodata.css"; // Import the CSS file

export const Biodata = () => {
  return (
    <div className="unique-biodata-container">
      {/* <h2 className="biodata-title">Biodata</h2> */}
      <div className="unique-biodata-card">
        <h3 className="biodata-name">
          <u>VijayLaxmi Maurya</u>
        </h3>
        <p>
          <strong>Date of Birth:</strong> 26th August 1995
        </p>
        <p>
          <strong>Place of Birth:</strong> Mau, Uttar Pradesh
        </p>
        <p>
          <strong>Time of Birth:</strong> 03:26 PM
        </p>
        <hr />
        <p>
          <strong>Current Profession:</strong> Working at EY India
        </p>

        {/* <p>
          <strong>Annual Income:</strong> Doesn't Matter
        </p> */}
        <p>
          <strong>Education:</strong> B.Tech in Computer science
        </p>
        <p>
          <strong>Professional Skills:</strong> Jav backend developer
        </p>
        <hr />
        <p>
          <strong>Contact Details:</strong>
          <ul>
            <li>
              Phone: <a href="tel:+919717740080">+91-8860252539</a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:vmaurya931@gmail.com">vmaurya931@gmail.com</a>
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Biodata;
