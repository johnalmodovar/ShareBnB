import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ListingList.css';

import SearchForm from "../../components/form/SearchForm";
import SharebnbApi from "../../utilities/api";
import ListingCard from "../../components/listing/ListingCard";

/** Renders list of listings.
 *
 * State:
 * - listings: [{ id, title, description, price, location, photoUrl, listedBy }, ...]
 *
 * RoutesList -> ListingList
 */

function ListingList() {
  const [listings, setListings] = useState([]);

  /** Fetches all listings from database. */
  useEffect(() => {
    async function fetchListings() {
      const data = await SharebnbApi.getListings();
      setListings(data);
    }
    fetchListings();
  }, []);

  /** Gets listing from database that closely matches searchTerm. */
  async function search(searchTerm) {
    const data = await SharebnbApi.getListings(searchTerm);
    setListings(data);
  }

  if (!listings) return <h1>Listings Loading...</h1>;

  return (
    <div className="ListingList">
      <div className="ListingList-search d-flex flex-column justify-content-center">
        <SearchForm search={search} />
      </div>

      <div className="ListingList-list">
        {listings.length === 0 && <p>Sorry, no results found!</p>}
        {listings.map(l => (
          <Link
            to={`${l.id}`}
            key={l.id}>
            <ListingCard listing={l} key={l.id} />
          </Link>))}
      </div>
    </div>
  );
}

export default ListingList;