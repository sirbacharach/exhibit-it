import React, { useContext, useEffect, useState } from "react";
import { getSingleClArtwork, getSingleChicagoArtwork } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { ListContext } from "./ListContext";

const ExhibitList = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const { finalList, tempList } = useContext(ListContext);

  useEffect(() => {
    setIsLoading(true);
    setApiError(null);

    const fetchArtworks = async () => {
      if (!Array.isArray(finalList) || finalList.length === 0) {
        setArtworks([]);
        setIsEmpty(true);
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
          setIsEmpty(filteredArtworks.length === 0);
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

  useEffect(() => {
    if (finalList.length === 0) {
      setIsLoading(false);
      setArtworks([]);
      setIsEmpty(true);
    }
  }, [finalList]);

  const handleGoBack = () => {
    window.history.back(); // Navigate back to the previous page
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
      {isEmpty ? (
        <div className="flex justify-center">
          <h2
            className="text-white font-bold font-headers text-2xl py-3"
            style={{ maxWidth: "50%", textAlign: "center" }}
          >
            There are currently no items in your list.
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
            Selected Artworks
          </h2>
          <div className="flex flex-wrap place-content-evenly pb-10">
            {artworks.map((artwork, index) => {
              const listItem = finalList[index];
              if (!listItem) return null; // Skip rendering if the listItem is undefined
              return (
                <ClArtworkCard
                  clArtwork={artwork}
                  key={artwork.athena_id}
                  selectedMuseum={listItem.gallery}
                  needsConfirm={true}
                  needTempListButton={false}
                  needExhibitButton={true}
                />
              );
            })}
          </div>
        </div>
      )}
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center text-white">
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  max-w-screen-lg bg-titlebackground text-center flex justify-between">
          <div className="flex items-center text-left w-20 pl-2">
            List Items: {tempList.length}
          </div>
          <div className="flex items-center justify-center w-60">
          <button onClick={handleGoBack}>Go Back</button>
          </div>
          <div className="flex items-center justify-end text-right w-20 pr-2">
            Exhibition Items: {finalList.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExhibitList;
