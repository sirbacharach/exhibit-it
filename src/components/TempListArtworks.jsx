import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "./ListContext";
import ClArtworkCard from "./ClArtworkCard";
import ChicagoArtworkCard from "./ChicagoArtworkCard";
import { Link } from "react-router-dom";

const TempListArtworks = () => {
  const { tempList, finalList } = useContext(ListContext);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [itemLimit, setItemLimit] = useState(10);
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [pageNo, setPageNo] = useState(0);
  const [maxRecords, setMaxRecords] = useState(0);
  const [tempListToDisplay, setTempListToDisplay] = useState([]);

  useEffect(() => {
    console.log("templist", tempList)
    setIsLoading(true);
    setApiError(null);

    const fetchArtworks = () => {
      if (!Array.isArray(tempList) || tempList.length === 0) {
        setTempListToDisplay([]);
        setIsEmpty(true);
        setIsLoading(false);
        return;
      }

      const artworks = tempList.map((item) => {
        if (!item || !item[0] || !item[1]) {
          return null; // Handle case where item or required properties are undefined
        }

        const { artworkId, gallery } = item[0];
        const artwork = item[1];

        return artwork ? { ...artwork, artworkId, gallery } : null;
      });

      const filteredArtworks = artworks.filter((artwork) => artwork !== null);
      setMaxRecords(filteredArtworks.length);
      // applyFiltersAndSort(filteredArtworks);
      setIsEmpty(filteredArtworks.length === 0);

      setIsLoading(false);
    };

    fetchArtworks();
    console.log("tempListToDisplay ", tempListToDisplay);
    console.log("temp list ", tempList);
  }, [tempList, itemLimit, sortCriteria, sortOrder, pageNo]);

  const applyFiltersAndSort = (artworks) => {
    let filteredArtworks = artworks;

    if (sortCriteria) {
      filteredArtworks.sort((a, b) => {
        if (sortOrder === "ascending") {
          return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
        } else {
          return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
        }
      });
    }

    const startIndex = pageNo * itemLimit;
    const endIndex = startIndex + itemLimit;

    setTempListToDisplay(filteredArtworks.slice(startIndex, endIndex));
  };

  const handleItemLimitChange = (event) => setItemLimit(Number(event.target.value));
  const handleSortCriteriaChange = (event) => setSortCriteria(event.target.value);
  const handleSortOrderChange = (event) => setSortOrder(event.target.value);
  const handlePreviousPage = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };
  const handleNextPage = () => {
    const totalPages = Math.ceil(maxRecords / itemLimit);
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  if (apiError) {
    return <Error message={apiError.message} />;
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="light-font-colour" id="status-msg">Please wait...</p>
        <p className="light-font-colour" id="status-msg">Artworks are loading...</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex justify-center">
        <h2 className="font-bold font-headers text-2xl py-3" style={{ maxWidth: "50%", textAlign: "center" }}>
          There are currently no items in your list.
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-center font-bold font-headers text-2xl pt-2 pb-1">Selected Artworks</h2>

        <div className="flex flex-wrap place-content-evenly pb-10">
          {tempList
            .filter(item => item[0].gallery === "Cleveland Museum of Art")
            .map(item => (
              <ClArtworkCard
                artwork={item[1]}
                key={item[1].systemNumber}
                selectedMuseum={item[0].gallery}
                needsConfirm={true}
                needTempListButton={true}
                needExhibitButton={true}
              />
            ))}
        </div>

        <div className="flex flex-wrap place-content-evenly pb-10">
          {tempList
            .filter(item => item[0].gallery === "Art Institute of Chicago")
            .map(item => (
              <ChicagoArtworkCard
                artwork={item[1]}
                key={item[1].objectNumber}
                selectedMuseum={item[0].gallery}
                needsConfirm={true}
                needTempListButton={true}
                needExhibitButton={true}
              />
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center text-left w-20 pl-2">
            List Items: {tempList.length}
          </div>
          <div className="flex items-center justify-center w-60">
            <Link onClick={handlePreviousPage} className="mx-2">&lt;&lt;</Link>
            Page No: {pageNo + 1} of {Math.ceil(maxRecords / itemLimit)}
            <Link onClick={handleNextPage} className="mx-2">&gt;&gt;</Link>
          </div>
          <div className="flex items-center justify-end text-right w-20 pr-2">
            Exhibition Items: {finalList.length}
          </div>
        </div>
      </div>
    </>
  );
};

export default TempListArtworks;
