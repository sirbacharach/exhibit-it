import React, { useEffect, useState } from "react";
import { getAllClArtworks, getAllChicagoArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { types, departments } from "./Queries";

const ArtworksRecords = ({ pageNo, setPageNo, itemLimit, setItemLimit, setMaxRecords }) => {
  const [clArtworks, setClArtworks] = useState([]);
  const [clArtToDisplay, setClArtToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selectedMuseum, setSelectedMuseum] = useState("Cleveland Museum of Art");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    setIsLoading(true);
    let fetchFunction;

    if (selectedMuseum === "Cleveland Museum of Art") {
      fetchFunction = getAllClArtworks;
    } else if (selectedMuseum === "Art Institute of Chicago") {
      fetchFunction = getAllChicagoArtworks;
    }

    if (fetchFunction) {
      fetchFunction(pageNo, itemLimit, selectedType, selectedDepartment)
        .then((response) => {
          setClArtworks(response[0]);
          setMaxRecords(response[1]);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err);
          setIsLoading(false);
        });
    }
  }, [pageNo, itemLimit, selectedMuseum, selectedType, selectedDepartment, setMaxRecords]);

  useEffect(() => {
    let sortedArtworks = [...clArtworks];

    if (sortCriteria) {
      sortedArtworks.sort((a, b) => {
        if (sortOrder === "ascending") {
          return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
        } else {
          return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
        }
      });
    }

    const startIdx = pageNo * itemLimit;
    const endIdx = startIdx + itemLimit;
    const slicedArtworks = sortedArtworks.slice(startIdx, endIdx);
    setClArtToDisplay(slicedArtworks);
  }, [clArtworks, pageNo, itemLimit, sortCriteria, sortOrder]);

  function handleMuseumChange(event) {
    setSelectedMuseum(event.target.value);
    setPageNo(0); // Reset pageNo when changing museum
  }

  function handleTypeChange(event) {
    setSelectedType(event.target.value);
    setPageNo(0);
  }

  function handleDepartmentChange(event) {
    setSelectedDepartment(event.target.value);
    setPageNo(0);
  }

  function handleItemLimitChange(event) {
    const limit = Number(event.target.value);
    setItemLimit(limit);
    setPageNo(0); // Reset pageNo when changing itemLimit
  }

  function handleSortCriteriaChange(event) {
    setSortCriteria(event.target.value);
    setPageNo(0);
  }

  function handleSortOrderChange(event) {
    setSortOrder(event.target.value);
    setPageNo(0);
  }

  if (isLoading) {
    return (
      <div className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
        <p>Please Wait</p>
        <p>Artworks are Loading....</p>
      </div>
    );
  }

  if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label htmlFor="museumSelect" className="block sm:inline mr-2 mb-1 sm:mb-0">
                Select Museum:
              </label>
              <select
                id="museumSelect"
                value={selectedMuseum}
                onChange={handleMuseumChange}
                className="px-2 py-1 border border-gray-300 rounded w-full sm:w-auto"
              >
                <option value="Cleveland Museum of Art">Cleveland Museum of Art</option>
                <option value="Art Institute of Chicago">Art Institute of Chicago</option>
              </select>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label htmlFor="typeSelect" className="block sm:inline mr-2 mb-1 sm:mb-0">
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
              <label htmlFor="departmentSelect" className="block sm:inline mr-2 mb-1 sm:mb-0">
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
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label htmlFor="itemLimitSelect" className="block sm:inline mr-2 mb-1 sm:mb-0">
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
              <label htmlFor="sortCriteriaSelect" className="block sm:inline mr-2 mb-1 sm:mb-0">
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
              </select>
            </div>
            <div className="flex flex-col items-center w-full sm:w-auto">
              <label htmlFor="sortOrderSelect" className="block sm:inline mr-2 mb-1 sm:mb-0">
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
        <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
          {selectedMuseum} Artworks
        </h2>
        {clArtToDisplay.length > 0 ? (
          <div className="flex flex-wrap place-content-evenly pb-10">
            {clArtToDisplay.map((clArtwork) => (
              <ClArtworkCard
                clArtwork={clArtwork}
                key={clArtwork.athena_id}
                selectedMuseum={selectedMuseum} // Pass selected museum to ClArtworkCard
                needsConfirm={false}
                needTempListButton={true}
                needExhibitButton={false}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1 flex flex-col">
            There is no artwork available for this category.
          </h2>
        )}
      </div>
    </>
  );
};

export default ArtworksRecords;
