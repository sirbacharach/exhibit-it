import { useEffect, useState } from "react";
import { getAllClArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { Link } from "react-router-dom";

const ClArtworks = () => {
  const [clArtworks, setClArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getAllClArtworks(pageNo)
      .then((response) => {
        setClArtworks(response);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, []);

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
    <>
      <div className="flex flex-wrap place-content-evenly">
        {clArtworks.map((clArtwork) => {
          return (
            <ClArtworkCard clArtwork={clArtwork} key={clArtwork.athena_id} />
          );
        })}
      </div>
      <br></br>
      <p className="text-center">Page No: {pageNo + 1}</p>
    </>
  );
};

export default ClArtworks;
