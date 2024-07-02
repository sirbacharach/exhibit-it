import { useEffect, useState } from "react";
import { getAllClArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { Link, useSearchParams } from "react-router-dom";

const ClArtworks = () => {
  const [clArtworks, setClArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState(searchParams.get("order"));
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by"));
  const [topic, setTopic] = useState(searchParams.get("topic"));
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getAllClArtworks(topic, sortBy, order)
      .then((response) => {
        setClArtworks(response);
        const newParams = new URLSearchParams(searchParams);
        if (topic !== null) newParams.set("topic", topic);
        if (sortBy !== null) newParams.set("sort_by", sortBy);
        if (order !== null) newParams.set("order", order);
        setSearchParams(newParams)
      }).then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, [sortBy, order, topic]);

  if (topic === null) setTopic("")
  if (sortBy === null) setSortBy("created_at")
  if (order === null) setOrder("DESC")

  function handleSortChange(event) {
    event.preventDefault()
    setSortBy(event.target.value);
    setIsLoading(true)
  }

  function handleOrderChange(event) {
    event.preventDefault()
    setOrder(event.target.value);
    setIsLoading(true)
  }

  function handleTopicChange(event) {
    event.preventDefault()
    if (event.target.value === "") {
      setTopic(undefined);
      setIsLoading(true)
    } else {
      setTopic(event.target.value);
      setIsLoading(true)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="light-font-colour" id="status-msg">
          Please Wait
        </p>
        <p className="light-font-colour" id="status-msg">
          Artworks are Loading....
        </p>
      </div>
    );
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <div className="light-font-colour">
      <div className="sort-menus-container">
        <div className="sort-menu">
          <label>
            Topic:
            <select value={topic} onChange={handleTopicChange}>
              <option value="">All</option>
              <option value="coding">Coding</option>
              <option value="football">Football</option>
              <option value="cooking">Cooking</option>
            </select>
          </label>
        </div>

        <div className="sort-menu">
          <label>
            Sort by:
            <select value={sortBy} onChange={handleSortChange}>
              <option value="created_at">Date Created</option>
              <option value="votes">Votes</option>
            </select>
          </label>
        </div>

        <div className="sort-menu">
          <label>
            Sort by:
            <select value={order} onChange={handleOrderChange}>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </label>
        </div>
      </div>

      <div className="artworks-container">
        <ul className="artworks outer-container-colour light-font-colour">
          {clArtworks.map((clArtwork) => {
            return <ClArtworkCard clArtwork={clArtwork} key={clArtwork.clArtwork} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ClArtworks;
