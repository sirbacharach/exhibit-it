import { useEffect, useState } from "react";
import { getAllClArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { Link } from "react-router-dom";

const ClArtworks = () => {
  const [clArtworks, setClArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(3);

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
  }, [pageNo]);

  function handlePreviousPage() {
    if (pageNo > 0) setPageNo(pageNo - 1);
  }

  function handleNextPage() {
    setPageNo(pageNo + 1);
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
    <>
      <div className="flex flex-wrap place-content-evenly">
        {clArtworks.map((clArtwork) => {
          return (
            <ClArtworkCard clArtwork={clArtwork} key={clArtwork.athena_id} />
          );
        })}
      </div>
      <br></br>
      <p className="text-center">
        <Link
          onClick={() => {
            handlePreviousPage();
          }}
        >
          &lt;&lt;{" "}
        </Link>
        Page No: {pageNo + 1}
        <Link
          onClick={() => {
            handleNextPage();
          }}
        >
          {" "}
          &gt;&gt;
        </Link>
      </p>
    </>
  );
};

export default ClArtworks;
