import React from "react";

import "./ListingCard.css";

/**
 * ListingCard:
 *
 * renders listing on ListingList page with link available for more details
 *
 * Props:
 * - listing object with all details about listing
 *  {title:..., }
 *
 */

function ListingCard({ listing }) {
  return (
    <div className="ListingCard container col card my-2 p-3 d-flex shadow p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <div className="mb-5">
          <img src={listing.photoUrl} style={{ width: "300px", height: "175px" }} />
        </div>
        <div>
          <h3>{listing.title}</h3>
        </div>
        <div>{listing.location}</div>
        <div>${listing.price}</div>
      </div>
    </div>
  );
}

export default ListingCard;