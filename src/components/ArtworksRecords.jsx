import React, { useEffect, useState } from "react";
import { getAllClArtworks, getAllChicagoArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import ChicagoArtworkCard from "./ChicagoArtworkCard";
import { types, departments } from "./Queries";

const ArtworksRecords = ({
  pageNo,
  setPageNo,
  itemLimit,
  setItemLimit,
  setMaxRecords,
}) => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selectedMuseum, setSelectedMuseum] = useState(
    "Cleveland Museum of Art"
  );
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortCriteria, setSortCriteria] = useState("date_end");
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
      fetchFunction(pageNo, itemLimit, selectedType, selectedDepartment, sortCriteria, sortOrder)
        .then((response) => {
          setArtworks(response[0]);
          setMaxRecords(response[1]);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err);
          setIsLoading(false);
        });
    }
  }, [
    pageNo,
    itemLimit,
    selectedMuseum,
    selectedType,
    selectedDepartment,
    setMaxRecords,
  ]);

  useEffect(() => {
    let sortedArtworks = [...artworks];

    if (sortCriteria) {
      sortedArtworks.sort((a, b) => {
        if (sortOrder === "ascending") {
          return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
        } else {
          return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
        }
      });
    }
    console.log(artworks)
  }, [artworks, pageNo, itemLimit, sortCriteria, sortOrder]);

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
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col items-center  w-auto">
            <label htmlFor="museumSelect" className="block mb-1 text-center">
              Select Museum:
            </label>
            <select
              id="museumSelect"
              value={selectedMuseum}
              onChange={handleMuseumChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto"
            >
              <option value="Cleveland Museum of Art">
                Cleveland Museum of Art
              </option>
              <option value="Art Institute of Chicago">
                Art Institute of Chicago
              </option>
            </select>
          </div>
          <div className="flex flex-col items-center w-auto">
            <label htmlFor="typeSelect" className="block mb-1 text-center">
              Type:
            </label>
            <select
              id="typeSelect"
              value={selectedType}
              onChange={handleTypeChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto"
            >
              <option value="">All</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center w-auto">
            <label
              htmlFor="departmentSelect"
              className="block mb-1 text-center"
            >
              Department:
            </label>
            <select
              id="departmentSelect"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto"
            >
              <option value="">All</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center w-auto">
            <label htmlFor="itemLimitSelect" className="block mb-1 text-center">
              Items per page:
            </label>
            <select
              id="itemLimitSelect"
              value={itemLimit}
              onChange={handleItemLimitChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
              <option value={80}>80</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex flex-col items-center  w-auto">
            <label
              htmlFor="sortCriteriaSelect"
              className="block mb-1 text-center"
            >
              Sort by:
            </label>
            <select
              id="sortCriteriaSelect"
              value={sortCriteria}
              onChange={handleSortCriteriaChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto"
            >
              <option value="">None</option>
              <option value="creation_date">Creation Date</option>
              <option value="type">Type</option>
              <option value="technique">Technique</option>
            </select>
          </div>
          <div className="flex flex-col items-center  w-auto">
            <label htmlFor="sortOrderSelect" className="block mb-1 text-center">
              Order:
            </label>
            <select
              id="sortOrderSelect"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
        <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
          {selectedMuseum} Artworks
        </h2>

        {selectedMuseum === "Cleveland Museum of Art" && (
          <>
            {artworks.length > 0 ? (
              <div className="flex flex-wrap place-content-evenly pb-10">
                {artworks.map((clArtwork) => (
                  <ClArtworkCard
                    artwork={clArtwork}
                    key={clArtwork.athena_id}
                    selectedMuseum={selectedMuseum}
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
          </>
        )}

        {selectedMuseum === "Art Institute of Chicago" && (
          <>
            {artworks.length > 0 ? (
              <div className="flex flex-wrap place-content-evenly pb-10">
                {artworks.map((chicagoArtwork) => (
                  <ChicagoArtworkCard
                    artwork={chicagoArtwork}
                    key={chicagoArtwork.id}
                    selectedMuseum={selectedMuseum}
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
          </>
        )}
      </div>
    </>
  );
};

export default ArtworksRecords;
