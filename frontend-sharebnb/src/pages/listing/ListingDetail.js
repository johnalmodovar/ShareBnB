import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SharebnbApi from "../../utilities/api";

import "./ListingDetail.css";

/** Renders component for a single listing.
 *
 * State:
 * - listing: { id, title, description, price, location, photoUrl, listedBy  }
 *
 * RoutesList -> ListingDetail
 */

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(function getListingOnMount() {
    async function fetchListing() {
      try {
        const listingData = await SharebnbApi.getListing(id);
        setListing(listingData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchListing();
  }, [id]);

  if (!listing) return <h1>Loading...</h1>;

  return (
    <div className="ListingDetail container">
      <div className="col m-5 d-flex justify-content-center">
        <img src={listing.photoUrl} className="ListingDetail-img" width="500px" />
      </div>

      <div className="container col card my-2 p-3 d-flex shadow p-3 mb-5 bg-white rounded">
        <h2>{listing.title}</h2>
        <h4>{listing.location}</h4>
        <p><h5>Host:</h5> {listing.listedBy}</p>
        <p><h5>Price:</h5> ${listing.price}</p>
        <p><h5>Description:</h5>{listing.description}</p>

        <form>
          <h4>Message the host!</h4>
          <textarea style={{ width: "50%" }} />
          <div className="m-2">
            <button className="btn btn-success">Send</button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default ListingDetail;