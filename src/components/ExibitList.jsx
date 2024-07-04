import React, { useContext, useEffect, useState } from "react";
import { getSingleClArtwork, getSingleChicagoArtwork } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { ListContext } from "./ListContext";

const ExhibitList = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false); // State to track if artworks array is empty

  const { finalList } = useContext(ListContext);

  useEffect(() => {
    setIsLoading(true);
    setApiError(null);

    const fetchArtworks = async () => {
      if (!Array.isArray(finalList) || finalList.length === 0) {
        setArtworks([]);
        setIsEmpty(true); // Update isEmpty state when tempList is empty
        setIsLoading(false);
        return;
      }

      const promises = finalList.map(async (item) => {
        try {
          let artwork;
          if (item.gallery === "Cleveland Museum of Art") {
            artwork = await getSingleClArtwork(item.artworkId);
          } else if (item.gallery === "Art Institute of Chicago") {
            artwork = await getSingleChicagoArtwork(item.artworkId);
          }
          return artwork;
        } catch (error) {
          console.error(`Error fetching artwork ${item.artworkId}:`, error);
          return null;
        }
      });

      Promise.all(promises)
        .then((artworks) => {
          const filteredArtworks = artworks.filter((artwork) => artwork !== null);
          setArtworks(filteredArtworks);
          setIsEmpty(filteredArtworks.length === 0); // Update isEmpty state based on artworks length
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching artworks:", error);
          setApiError(error);
          setIsLoading(false);
        });
    };

    fetchArtworks();
  }, [finalList]);

  // Reset isLoading and artworks array when finalList is empty
  useEffect(() => {
    if (finalList.length === 0) {
      setIsLoading(false); // Reset isLoading to false when finalList is empty
      setArtworks([]);
      setIsEmpty(true); // Set isEmpty to true when finalList is empty
    }
  }, [finalList]);

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
      {isEmpty ? ( // Check if artworks array is empty
        <div className="flex justify-center">
          <h2 className="text-white font-bold font-headers text-2xl py-3" style={{ maxWidth: "50%", textAlign: "center" }}>
            There are currently no items in your list.
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
            Selected Artworks
          </h2>
          <div className="flex flex-wrap place-content-evenly pb-10">
            {artworks.map((artwork) => (
              <ClArtworkCard
                clArtwork={artwork}
                key={artwork.athena_id}
                selectedMuseum={artwork.gallery} // Adjust as per your data structure
                needsConfirm={true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ExhibitList;
