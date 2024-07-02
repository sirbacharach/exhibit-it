import { useEffect, useState } from "react";
import { getAllClArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { Link } from "react-router-dom";

const ClArtworks = () => {
  const [clArtworks, setClArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [maxRecords, setMaxRecords] = useState(0);

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getAllClArtworks(pageNo)
      .then((response) => {
        setClArtworks(response[0]);
        setMaxRecords(response[1]);
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
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
      setIsLoading(true);
    }
  }

  function handleNextPage() {
    setPageNo(pageNo + 1);
    setIsLoading(true);
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

      <div className="min-w-full max-w-screen-lg min-h-screen mx-auto relative">
  <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
  <p className="text-center m-2 text-white">
        <Link
          onClick={() => {
            handlePreviousPage();
          }}
        >
          &lt;&lt;{" "}
        </Link>
        Page No: {pageNo + 1} of {Math.ceil(maxRecords / 10)}
        <Link
          onClick={() => {
            handleNextPage();
          }}
        >
          {" "}
          &gt;&gt;
        </Link>
      </p>
  </div>
</div>
    </>
  );
};

export default ClArtworks;
