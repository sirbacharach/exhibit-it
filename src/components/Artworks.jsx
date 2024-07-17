import { useState, useContext } from "react";
import ArtworksRecords from "./ArtworksRecords";
import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";
import { Helmet } from "react-helmet-async";

const Artworks = () => {
  const [pageNo, setPageNo] = useState(0);
  const [itemLimit, setItemLimit] = useState(10);
  const [maxRecords, setMaxRecords] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState([]);
  const [apiError] = useState("");
  const { tempList } = useContext(ListContext);
  const { finalList } = useContext(ListContext);

  function handlePreviousPage() {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  }

  function handleNextPage() {
    if (pageNo < Math.ceil(maxRecords / itemLimit) - 1) setPageNo(pageNo + 1);
  }

  if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <Helmet>
        <title>Gallery</title>
        <meta
          name="Exhibit-it"
          content="Browse, search and filter artworks so that you can add them to your temporary list."
        />
      </Helmet>
      <div className="min-w-full max-w-screen-lg mx-auto relative">
        <ArtworksRecords
          pageNo={pageNo}
          setPageNo={setPageNo}
          itemLimit={itemLimit}
          setItemLimit={setItemLimit}
          setMaxRecords={setMaxRecords}
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
        />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center text-md">
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  max-w-screen-lg bg-titlebackground text-center flex justify-between">
          <div className="flex items-center text-left w-20 pl-2">
            List Items: {tempList.length}
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
            Page No: {pageNo + 1} of {Math.ceil(maxRecords / itemLimit)}
            <Link
              onClick={() => {
                handleNextPage();
              }}
              className="mx-2"
            >
              &gt;&gt;
            </Link>
          </div>
          <div className="flex items-center justify-end text-right w-20 pr-2">
            Exhibition Items: {finalList.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default Artworks;
