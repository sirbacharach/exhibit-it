import React, { useEffect, useState } from "react";
import { getAllClArtworks, getAllChicagoArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";

const ArtworksRecords = ({ pageNo }) => {
  const [clArtworks, setClArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selectedMuseum, setSelectedMuseum] = useState("Cleveland");

  useEffect(() => {
    setIsLoading(true);
    if (selectedMuseum === "Cleveland") {
      getAllClArtworks(pageNo)
        .then((response) => {
          setClArtworks(response[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err);
          setIsLoading(false);
        });
    } else if (selectedMuseum === "Chicago") {
      getAllChicagoArtworks(pageNo)
        .then((response) => {
          setClArtworks(response[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err);
          setIsLoading(false);
        });
    }
  }, [pageNo, selectedMuseum]);

  const handleMuseumChange = (event) => {
    setSelectedMuseum(event.target.value);
  };

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
  }

  if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="flex justify-center mb-4">
        <label htmlFor="museumSelect" className="mr-2">
          Select Museum:
        </label>
        <select
          id="museumSelect"
          value={selectedMuseum}
          onChange={handleMuseumChange}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="Cleveland">Cleveland Museum of Art</option>
          <option value="Chicago">Art Institute of Chicago</option>
        </select>
      </div>
      <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
        {selectedMuseum} Artworks
      </h2>
      <div className="flex flex-wrap place-content-evenly pb-10">
        {clArtworks.map((clArtwork) => (
          <ClArtworkCard
            clArtwork={clArtwork}
            key={clArtwork.athena_id}
            selectedMuseum={selectedMuseum} // Pass selected museum to ClArtworkCard
          />
        ))}
      </div>
    </>
  );
};

export default ArtworksRecords;
