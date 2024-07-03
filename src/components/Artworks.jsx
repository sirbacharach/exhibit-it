import { useEffect, useState } from "react";
import { getAllClArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { Link } from "react-router-dom";
import ClArtworksRecords from "./ClArtworksRecords";

const Artworks = () => {
  const [pageNo, setPageNo] = useState(0);
  const [maxRecords, setMaxRecords] = useState(0);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getAllClArtworks(pageNo)
      .then((response) => {
        setMaxRecords(response[1]);
      })
      .then(() => {
      })
      .catch((err) => {
        setApiError(err);
      });
  }, [pageNo]);

  function handlePreviousPage() {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  }

  function handleNextPage() {
    setPageNo(pageNo + 1);
  }

  if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="min-w-full max-w-screen-lg mx-auto relative">
        <ClArtworksRecords pageNo={pageNo} />
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
          <p className="text-center m-1 text-white">
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

export default Artworks;
