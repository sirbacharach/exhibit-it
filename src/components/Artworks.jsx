import { useEffect, useState, useContext } from "react";
import { getAllClArtworks } from "./api";
import ClArtworksRecords from "./ClArtworksRecords";
import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";

const Artworks = () => {
  const [pageNo, setPageNo] = useState(0);
  const [maxRecords, setMaxRecords] = useState(0);
  const [apiError, setApiError] = useState("");
  const { tempList } = useContext(ListContext);

  

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
        <ClArtworksRecords pageNo={pageNo} setPageNo = {setPageNo} setMaxRecords={setMaxRecords}/>
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center text-white">
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  max-w-screen-lg bg-titlebackground text-center flex justify-between">
          <div className="flex items-center text-left w-20">
            Total Items: {tempList.length}
          </div>
          <div className="flex items-center justify-center w-60">
            <Link
              onClick={() => {
                handlePreviousPage();
              }}
              className="mx-2"
            >
              &lt;&lt;
            </Link>
            Page No: {pageNo + 1} of {Math.ceil(maxRecords / 10)}
            <Link
              onClick={() => {
                handleNextPage();
              }}
              className="mx-2"
            >
              &gt;&gt;
            </Link>
          </div>
          <div className="flex items-center justify-end text-right w-20">
            Exhibition Items
          </div>
      </div>
        </div>
    </>
  );
};

export default Artworks;
