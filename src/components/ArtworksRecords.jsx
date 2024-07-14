import React, { useEffect, useState } from "react";
import {
  getAllVAndAArtworks,
  getAllRijkArtworks,
  getRijkFacets,
} from "./api";
import VAndAArtworkCard from "./VAndAArtworkCard";
import RijkArtworkCard from "./RijkArtworkCard";
import { museum1Materials, museum1Places, museum1People } from "./Queries";

const ArtworksRecords = ({
  pageNo,
  setPageNo,
  itemLimit,
  setItemLimit,
  setMaxRecords,
  searchCriteria,
  setSearchCriteria,
}) => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [selectedMuseum, setSelectedMuseum] = useState(
    "Victoria and Albert Museum"
  );
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [principalMaker, setPrincipalMaker] = useState("");
  const [type, setType] = useState("");
  const [datingPeriod, setDatingPeriod] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [technique, setTechnique] = useState("");
  const [userSearch, setUserSearch] = useState(""); // New state for user search
  const [tempUserSearch, setTempUserSearch] = useState(""); // New state for temporary search input

  useEffect(() => {
    document.documentElement.lang = "en"
    setIsLoading(true);
    let fetchFunction;

    if (selectedMuseum === "Rijks Museum") {
      getRijkFacets().then((facets) => {
        setSearchCriteria(facets);
      });
    }

    if (selectedMuseum === "Victoria and Albert Museum") {
      fetchFunction = getAllVAndAArtworks;
    } else if (selectedMuseum === "Rijks Museum") {
      fetchFunction = getAllRijkArtworks;
    }

    if (fetchFunction) {
      fetchFunction(
        pageNo,
        itemLimit,
        selectedMaterial,
        selectedPlace,
        selectedPerson,
        userSearch,
        sortCriteria,
        sortOrder,
        principalMaker,
        type,
        datingPeriod,
        technique
      )
        .then((response) => {
          const artworksData = response[0];
          setArtworks(artworksData);
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
    sortCriteria,
    sortOrder,
    setMaxRecords,
    principalMaker,
    type,
    datingPeriod,
    selectedPlace,
    selectedMaterial,
    selectedPerson,
    technique,
    userSearch,
  ]);
  function handleMuseumChange(event) {
    setSelectedMuseum(event.target.value);
    setPageNo(0);
  }

  function handleItemLimitChange(event) {
    const limit = Number(event.target.value);
    setItemLimit(limit);
    setPageNo(0);
  }

  function handleSortCriteriaChange(event) {
    setSortCriteria(event.target.value);
    setPageNo(0);
  }

  function handleSortOrderChange(event) {
    setSortOrder(event.target.value);
    setPageNo(0);
  }

  function handlePrincipalMakerChange(event) {
    setPrincipalMaker(event.target.value);
    setSortCriteria("artist");
    setPageNo(0);
  }

  function handleTypeFilterChange(event) {
    setType(event.target.value);
    setSortCriteria("");
  }

  function handleDatingPeriodChange(event) {
    setDatingPeriod(event.target.value);
    setSortCriteria("");
  }

  function handlePlaceChange(event) {
    setSelectedPlace(event.target.value);
    setSortCriteria("");
    setSelectedPerson("");
    setSelectedMaterial("");
  }

  function handleMaterialChange(event) {
    setSelectedMaterial(event.target.value);
    setSortCriteria("");
    setSelectedPerson("");
    setSelectedPlace("");
  }

  function handlePersonChange(event) {
    setSelectedPerson(event.target.value);
    setSortCriteria("");
    setSelectedMaterial("");
    setSelectedPlace("");
  }

  function handleTechniqueChange(event) {
    setTechnique(event.target.value);
    setSortCriteria("");
  }

  function handleUserSearchChange(event) {
    setTempUserSearch(event.target.value); // Update temporary search input
    setPageNo(0);
  }

  function handleUserSearchUpdate() {
    setUserSearch(tempUserSearch); // Update user search
    setSelectedPerson("");
    setSortCriteria("");
    setSelectedMaterial("");
    setSelectedPlace("");
    setPageNo(0);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleUserSearchUpdate(); // Handle Enter key press
    }
  };

  const renderSortOptions = () => {
    if (selectedMuseum === "Victoria and Albert Museum") {
      return (
        <>
          <option value="">None</option>
          <option value="location">location</option>
          <option value="artist">artist</option>
          <option value="place">place</option>
          <option value="date">date</option>
        </>
      );
    } else {
      return (
        <>
          <option value="">None</option>
          <option value="artist">Artist</option>
          <option value="chronologic">Chronologic</option>
        </>
      );
    }
  };

  const renderMuseumSpecificFilters = () => {
    if (selectedMuseum === "Victoria and Albert Museum") {
      return (
        <>
          <div className="flex flex-col items-center w-full sm:w-auto mx-1">
            <label htmlFor="materialSelect" className="block text-center">
              Material:
            </label>
            <select
              id="materialSelect"
              value={selectedMaterial}
              onChange={handleMaterialChange}
              className="px-1 py-1 border border-gray-300 rounded w-full sm:w-auto text-black"
            >
              <option value="">All</option>
              {museum1Materials.map((material, index) => (
                <option key={index} value={material.code}>
                  {material.materialName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center w-full sm:w-auto mx-1">
            <label htmlFor="placeSelect" className="block text-center">
              Places:
            </label>
            <select
              id="placeSelect"
              value={selectedPlace}
              onChange={handlePlaceChange}
              className="px-1 py-1 border border-gray-300 rounded w-full sm:w-auto text-black"
            >
              <option value="">All</option>
              {museum1Places.map((place, index) => (
                <option key={index} value={place.code}>
                  {place.placeName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center w-full sm:w-auto mx-1">
            <label htmlFor="personSelect" className="block text-center">
              Person:
            </label>
            <select
              id="personSelect"
              value={selectedPerson}
              onChange={handlePersonChange}
              className="px-1 py-1 border border-gray-300 rounded w-full sm:w-auto text-black"
            >
              <option value="">All</option>
              {museum1People.map((person, index) => (
                <option key={index} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    } else {
      if (Array.isArray(searchCriteria) && searchCriteria.length > 0) {
        return (
          <>
            <div className="flex flex-col items-center w-full sm:w-auto mx-1">
              <label
                htmlFor="principalMakerSelect"
                className="block text-center"
              >
                Principal Maker:
              </label>
              <select
                id="principalMakerSelect"
                value={principalMaker}
                onChange={handlePrincipalMakerChange}
                className="px-1 py-1 border border-gray-300 rounded w-full sm:w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[0].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto mx-1">
              <label htmlFor="typeSelect" className="block text-center">
                Type:
              </label>
              <select
                id="typeSelect"
                value={type}
                onChange={handleTypeFilterChange}
                className="px-1 py-1 border border-gray-300 rounded w-full sm:w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[1].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto mx-1">
              <label htmlFor="datingPeriodSelect" className="block text-center">
                Dating Period:
              </label>
              <select
                id="datingPeriodSelect"
                value={datingPeriod}
                onChange={handleDatingPeriodChange}
                className="px-1 py-1 border border-gray-300 rounded w-full sm:w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[2].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center w-full sm:w-auto mx-1">
              <label htmlFor="techniqueSelect" className="block text-center">
                Technique:
              </label>
              <select
                id="techniqueSelect"
                value={technique}
                onChange={handleTechniqueChange}
                className="px-1 py-1 border border-gray-300 rounded w-full sm:w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[3].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      } else {
        return <p>No search criteria found.</p>;
      }
    }
  };


  if (isLoading) {
    return (
      <div className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
        <p>Please Wait</p>
        <p>Artworks are Loading....</p>
      </div>
    );
  }

  if (apiError) {
    return <div>Error: {apiError.message}</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
        {selectedMuseum} Artworks
      </h2>
      {selectedMuseum === "Rijks Museum" ? <p className="text-center font-bold text-green-200">(Please use your browser's translator if you would like to see this page in English)</p> : null}
        <div className="flex flex-col items-center w-auto mx-1">
          <label
            htmlFor="museumSelect"
            className="block text-center text-white"
          >
            Select Museum:
          </label>
          <select
            id="museumSelect"
            value={selectedMuseum}
            onChange={handleMuseumChange}
            className="px-1 py-1 border border-gray-300 rounded w-full xs:w-auto text-black"
          >
            <option value="Victoria and Albert Museum" className="text-center">
              Victoria and Albert Museum
            </option>
            <option value="Rijks Museum" className="text-center">
              Rijks Museum
            </option>
          </select>
        </div>
      <div className="flex flex-wrap justify-center">
      <div className="flex flex-col h-full w-full sm:w-auto mx-1">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full sm:w-auto mr-1">
            <label
              htmlFor="userSearch"
              className="block text-center text-white"
            >
              Type Search:
            </label>
            <input
              id="userSearch"
              type="text"
              value={tempUserSearch}
              onChange={handleUserSearchChange}
              onKeyDown={handleKeyPress}
              className="px-2 py-0.5 border border-gray-300 rounded w-full sm:w-auto text-black"
              maxLength={30}
            />
          </div>
          <button
            onClick={handleUserSearchUpdate}
            className="px-2 py-0.5 border border-gray-300 rounded end text-white font-bold bg-blue-700 active:bg-blue-500  ease-in-out mt-auto"
          >
            Go
          </button>
        </div>
      </div>
        {renderMuseumSpecificFilters()}
        <div className="flex flex-col items-center w-auto mx-1">
          <label
            htmlFor="itemLimitSelect"
            className="block text-center text-white"
          >
            Items/page:
          </label>
          <select
            id="itemLimitSelect"
            value={itemLimit}
            onChange={handleItemLimitChange}
            className="px-1 py-1 border border-gray-300 rounded w-auto text-black"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={80}>80</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex flex-col items-center w-auto mx-1">
          <label
            htmlFor="sortCriteriaSelect"
            className="block text-center text-white"
          >
            Sort by:
          </label>
          <select
            id="sortCriteriaSelect"
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            className="px-1 py-1 border border-gray-300 rounded w-auto text-black"
          >
            {renderSortOptions()}
          </select>
        </div>

        <div className="flex flex-col items-center w-auto mx-1">
          <label
            htmlFor="sortOrderSelect"
            className="block text-center text-white"
          >
            Order:
          </label>
          <select
            id="sortOrderSelect"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="px-1 py-1 border border-gray-300 rounded w-auto text-black"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {selectedMuseum === "Victoria and Albert Museum" && (
        <ul className="flex flex-wrap place-content-evenly pb-10 pt-2">
          {artworks.length > 0 ? (
            artworks.map((clArtwork, index) => (
              <VAndAArtworkCard
                artwork={clArtwork}
                key={clArtwork.systemNumber + index.toString()}
                selectedMuseum={selectedMuseum}
                needsConfirm={false}
                needTempListButton={true}
                needExhibitButton={false}
              />
            ))
          ) : (
            <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1 flex flex-col">
              There are no artworks available for this category.
            </h2>
          )}
        </ul>
      )}

      {selectedMuseum === "Rijks Museum" && (
        <ul className="flex flex-wrap place-content-evenly pb-10">
          {artworks.length > 0 ? (
            artworks.map((RijkArtwork, index) => (
              <RijkArtworkCard
                artwork={RijkArtwork}
                key={RijkArtwork.id + index.toString()}
                selectedMuseum={selectedMuseum}
                needsConfirm={false}
                needTempListButton={true}
                needExhibitButton={false}
              />
            ))
          ) : (
            <h2 className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1 flex flex-col">
              There are no artworks available for this category.
            </h2>
          )}
        </ul>
      )}
    </div>
  );
};

export default ArtworksRecords;
