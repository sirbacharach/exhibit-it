import React, { useEffect, useState } from "react";
import {
  getAllClArtworks,
  getAllChicagoArtworks,
  getChicagoFacets,
} from "./api";
import ClArtworkCard from "./ClArtworkCard";
import ChicagoArtworkCard from "./ChicagoArtworkCard";
import { types, departments } from "./Queries";

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
    "Cleveland Museum of Art"
  );
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [principalMaker, setPrincipalMaker] = useState("");
  const [type, setType] = useState("");
  const [datingPeriod, setDatingPeriod] = useState("");
  const [place, setPlace] = useState("");
  const [material, setMaterial] = useState("");
  const [technique, setTechnique] = useState("");
  const [hasImage, setHasImage] = useState(""); // State for image filter

  useEffect(() => {
    if (selectedMuseum === "Art Institute of Chicago") {
      getChicagoFacets().then((facets) => {
        setSearchCriteria(facets);
      });
    }
  }, [selectedMuseum, setSearchCriteria]);

  useEffect(() => {
    setIsLoading(true);
    let fetchFunction;

    if (selectedMuseum === "Cleveland Museum of Art") {
      fetchFunction = getAllClArtworks;
    } else if (selectedMuseum === "Art Institute of Chicago") {
      fetchFunction = getAllChicagoArtworks;
    }

    if (fetchFunction) {
      fetchFunction(
        pageNo,
        itemLimit,
        selectedType,
        selectedDepartment,
        sortCriteria,
        sortOrder,
        principalMaker,
        type,
        datingPeriod,
        place,
        material,
        technique
      )
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
    sortCriteria,
    sortOrder,
    setMaxRecords,
    principalMaker,
    type,
    datingPeriod,
    place,
    material,
    technique,
  ]);

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
    setPlace(event.target.value);
    setSortCriteria("");
  }

  function handleMaterialChange(event) {
    setMaterial(event.target.value);
    setSortCriteria("");
  }

  function handleTechniqueChange(event) {
    setTechnique(event.target.value);
    setSortCriteria("");
  }

  function handleHasImageChange(event) {
    const value = event.target.value;
    setHasImage(value);
    setItemLimit(40)
    setPageNo(0);
  }

  const renderSortOptions = () => {
    if (selectedMuseum === "Cleveland Museum of Art") {
      return (
        <>
          <option value="">None</option>
          <option value="creation_date">Creation Date</option>
          <option value="type">Type</option>
          <option value="technique">Technique</option>
        </>
      );
    } else {
      return (
        <>
          <option value="">None</option>
          <option value="relevance">Relevance</option>
          <option value="objecttype">Object Type</option>
          <option value="chronologic">Chronologic</option>
          <option value="artist">Artist</option>
        </>
      );
    }
  };

  const renderMuseumSpecificFilters = () => {
    if (selectedMuseum === "Cleveland Museum of Art") {
      return (
        <>
          <div className="flex flex-col items-center w-auto">
            <label htmlFor="typeSelect" className="block mb-1 text-centere">
              Type:
            </label>
            <select
              id="typeSelect"
              value={selectedType}
              onChange={handleTypeChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
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
              className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
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
            <label
              htmlFor="hasImageSelect"
              className="block mb-1 text-center"
            >
              Records with images:
            </label>
            <select
              id="hasImageSelect"
              value={hasImage}
              onChange={handleHasImageChange}
              className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
            >
              <option value="">All</option>
              <option value="true">With images only</option>
            </select>
          </div>
        </>
      );
    } else {
      if (Array.isArray(searchCriteria) && searchCriteria.length > 0) {
        return (
          <>
            <div className="flex flex-col items-center w-auto">
              <label
                htmlFor="principalMakerSelect"
                className="block mb-1 text-center"
              >
                Principal Maker:
              </label>
              <select
                id="principalMakerSelect"
                value={principalMaker}
                onChange={handlePrincipalMakerChange}
                className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[0].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-auto">
              <label
                htmlFor="typeFilterSelect"
                className="block mb-1 text-center"
              >
                Type:
              </label>
              <select
                id="typeFilterSelect"
                value={type}
                onChange={handleTypeFilterChange}
                className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[1].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-auto">
              <label
                htmlFor="datingPeriodSelect"
                className="block mb-1 text-center"
              >
                Dating Period:
              </label>
              <select
                id="datingPeriodSelect"
                value={datingPeriod}
                onChange={handleDatingPeriodChange}
                className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[2].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-auto">
              <label htmlFor="placeSelect" className="block mb-1 text-center">
                Place:
              </label>
              <select
                id="placeSelect"
                value={place}
                onChange={handlePlaceChange}
                className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[3].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-auto">
              <label
                htmlFor="materialSelect"
                className="block mb-1 text-center"
              >
                Material:
              </label>
              <select
                id="materialSelect"
                value={material}
                onChange={handleMaterialChange}
                className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[4].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center w-auto">
              <label
                htmlFor="techniqueSelect"
                className="block mb-1 text-center"
              >
                Technique:
              </label>
              <select
                id="techniqueSelect"
                value={technique}
                onChange={handleTechniqueChange}
                className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
              >
                <option value="">All</option>
                {searchCriteria[5].facets.map((facet, index) => (
                  <option key={index} value={facet.key}>
                    {facet.key}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      }
      return null;
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

  const filteredArtworks = hasImage
    ? artworks.filter((artwork) => artwork.images.length > 0)
    : artworks;

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col items-center w-auto">
          <label
            htmlFor="museumSelect"
            className="block mb-1 text-center text-white"
          >
            Select Museum:
          </label>
          <select
            id="museumSelect"
            value={selectedMuseum}
            onChange={handleMuseumChange}
            className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
          >
            <option value="Cleveland Museum of Art">
              Cleveland Museum of Art
            </option>
            <option value="Art Institute of Chicago">
              Art Institute of Chicago
            </option>
          </select>
        </div>
        {renderMuseumSpecificFilters()}
        <div className="flex flex-col items-center w-auto">
          <label
            htmlFor="itemLimitSelect"
            className="block mb-1 text-center text-white"
          >
            Max items/page:
          </label>
          <select
            id="itemLimitSelect"
            value={itemLimit}
            onChange={handleItemLimitChange}
            className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
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
            className="block mb-1 text-center text-white"
          >
            Sort by:
          </label>
          <select
            id="sortCriteriaSelect"
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
          >
            {renderSortOptions()}
          </select>
        </div>
        <div className="flex flex-col items-center  w-auto">
          <label
            htmlFor="sortOrderSelect"
            className="block mb-1 text-center text-white"
          >
            Order:
          </label>
          <select
            id="sortOrderSelect"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="px-2 py-1 border border-gray-300 rounded w-auto text-black"
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
        <ul className="flex flex-wrap place-content-evenly pb-10">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((clArtwork, index) => (
              <ClArtworkCard
                artwork={clArtwork}
                key={clArtwork.accession_number + index.toString()}
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

      {selectedMuseum === "Art Institute of Chicago" && (
        <ul className="flex flex-wrap place-content-evenly pb-10">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((chicagoArtwork, index) => (
              <ChicagoArtworkCard
                artwork={chicagoArtwork}
                key={chicagoArtwork.id + index.toString()}
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
