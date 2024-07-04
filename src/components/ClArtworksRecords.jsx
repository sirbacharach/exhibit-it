import React, { useEffect, useState } from "react";
import { getAllClArtworks, getAllChicagoArtworks } from "./api";
import ClArtworkCard from "./ClArtworkCard";
import { types, departments } from "./Queries";

const ArtworksRecords = ({ pageNo, setPageNo, itemLimit, setItemLimit, setMaxRecords }) => {
  const [clArtworks, setClArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selectedMuseum, setSelectedMuseum] = useState("Cleveland Museum of Art");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (selectedMuseum === "Cleveland Museum of Art") {
      getAllClArtworks(pageNo, itemLimit, selectedType, selectedDepartment)
        .then((response) => {
          setClArtworks(response[0]);
          setMaxRecords(response[1]);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err);
          setIsLoading(false);
        });
    } else if (selectedMuseum === "Art Institute of Chicago") {
      getAllChicagoArtworks(pageNo, itemLimit, selectedType, selectedDepartment)
        .then((response) => {
          setClArtworks(response[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err);
          setIsLoading(false);
        });
    }
  }, [pageNo, itemLimit, selectedMuseum, selectedType, selectedDepartment]);

  function handleMuseumChange(event) {
    setSelectedMuseum(event.target.value);
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
    setItemLimit(Number(event.target.value));
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
        <div className="flex flex-wrap justify-center mb-4 gap-4">
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
        </div>
        <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
          {selectedMuseum} Artworks
        </h2>
        {clArtworks.length > 0 ? (
          <div className="flex flex-wrap place-content-evenly pb-10">
            {clArtworks.map((clArtwork) => (
              <ClArtworkCard
                clArtwork={clArtwork}
                key={clArtwork.athena_id}
                selectedMuseum={selectedMuseum} // Pass selected museum to ClArtworkCard
                needsConfirm={false}
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
