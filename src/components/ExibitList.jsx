import React, { useContext, useEffect, useState } from "react";
import { getSingleClArtwork, getSingleChicagoArtwork } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import ChicagoArtworkCard from "./ChicagoArtworkCard";
import { ListContext } from "./ListContext";
import { types, departments } from "./Queries";
import { Link } from "react-router-dom";

const FinalListArtworks = () => {
  const { tempList, finalList } = useContext(ListContext);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [itemLimit, setItemLimit] = useState(10);
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [pageNo, setPageNo] = useState(0);
  const [maxRecords, setMaxRecords] = useState(0);
  const [finalListToDisplay, setFinalListToDisplay] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setApiError(null);
    const fetchArtworks = async () => {
      if (!Array.isArray(finalList) || finalList.length === 0) {
        setFinalListToDisplay([]);
        setIsEmpty(true);
        setIsLoading(false);
        return;
      }

      try {
        const artworks = await Promise.all(
          finalList.map(async (item) => {
            if (!item || !item.gallery || !item.artworkId) {
              return null; // Handle case where item or required properties are undefined
            }

            let artwork;
            if (item.gallery === "Cleveland Museum of Art") {
              artwork = await getSingleClArtwork(item.artworkId);
            } else if (item.gallery === "Art Institute of Chicago") {
              artwork = await getSingleChicagoArtwork(item.artworkId);
            }
            return artwork ? { ...artwork, gallery: item.gallery } : null;
          })
        );

        const filteredArtworks = artworks.filter((artwork) => artwork !== null);
        setMaxRecords(filteredArtworks.length);
        applyFiltersAndSort(filteredArtworks);
        setIsEmpty(filteredArtworks.length === 0);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, [
    finalList,
    selectedType,
    selectedDepartment,
    itemLimit,
    sortCriteria,
    sortOrder,
    pageNo,
  ]);

  const applyFiltersAndSort = (artworks) => {
    let filteredArtworks = artworks;

    if (selectedType !== "") {
      filteredArtworks = filteredArtworks.filter(
        (artwork) => artwork.type === selectedType
      );
    }
    if (selectedDepartment !== "") {
      filteredArtworks = filteredArtworks.filter(
        (artwork) => artwork.department === selectedDepartment
      );
    }

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
    setFinalListToDisplay(filteredArtworks.slice(startIndex, endIndex));
  };

  const handleTypeChange = (event) => setSelectedType(event.target.value);

  const handleDepartmentChange = (event) => setSelectedDepartment(event.target.value);

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
        <p className="light-font-colour" id="status-msg">
          Please wait...
        </p>
        <p className="light-font-colour" id="status-msg">
          Artworks are loading...
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex justify-center">
        <h2
          className="text-white font-bold font-headers text-2xl py-3"
          style={{ maxWidth: "50%", textAlign: "center" }}
        >
          There are currently no items in your list.
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label
                htmlFor="typeSelect"
                className="block sm:inline mr-2 mb-1 sm:mb-0"
              >
                Type:
              </label>
              <select
                id="typeSelect"
                value={selectedType}
                onChange={handleTypeChange}
                className="px-2 py-1 border border-gray-300 rounded w-full sm:w-auto"
              >
                <option value="">All</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label
                htmlFor="departmentSelect"
                className="block sm:inline mr-2 mb-1 sm:mb-0"
              >
                Department:
              </label>
              <select
                id="departmentSelect"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="px-2 py-1 border border-gray-300 rounded w-full sm:w-auto"
              >
                <option value="">All</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label
                htmlFor="itemLimitSelect"
                className="block sm:inline mr-2 mb-1 sm:mb-0"
              >
                Items per page:
              </label>
              <select
                id="itemLimitSelect"
                value={itemLimit}
                onChange={handleItemLimitChange}
                className="px-2 py-1 border border-gray-300 rounded w-full sm:w-auto"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={80}>80</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label
                htmlFor="sortCriteriaSelect"
                className="block sm:inline mr-2 mb-1 sm:mb-0"
              >
                Sort by:
              </label>
              <select
                id="sortCriteriaSelect"
                value={sortCriteria}
                onChange={handleSortCriteriaChange}
                className="px-2 py-1 border border-gray-300 rounded w-full sm:w-auto"
              >
                <option value="">None</option>
                <option value="creation_date">Creation Date</option>
                <option value="type">Type</option>
                <option value="technique">Technique</option>
              </select>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label
                htmlFor="sortOrderSelect"
                className="block sm:inline mr-2 mb-1 sm:mb-0"
              >
                Order:
              </label>
              <select
                id="sortOrderSelect"
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="px-2 py-1 border border-gray-300 rounded w-full sm:w-auto"
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
        Selected Artworks
      </h2>

      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-wrap place-content-evenly pb-10">
          {finalListToDisplay.map((artwork) => (
            <ClArtworkCard
              artwork={artwork}
              key={artwork.athena_id}
              selectedMuseum={artwork.gallery} // Fixed the access to gallery
              needsConfirm={false}
              needTempListButton={false}
              needExhibitButton={true}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center text-white">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center text-left w-20 pl-2">
            List Items: {finalList.length}
          </div>
          <div className="flex items-center justify-center w-60">
            <Link onClick={handlePreviousPage} className="mx-2">
              &lt;&lt;
            </Link>
            Page No: {pageNo + 1} of {Math.ceil(maxRecords / itemLimit)}
            <Link onClick={handleNextPage} className="mx-2">
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

export default FinalListArtworks;
