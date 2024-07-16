import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "./ListContext";
import VAndAArtworkCard from "./VAndAArtworkCard";
import RijkArtworkCard from "./RijkArtworkCard";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const TempListArtworks = () => {
  const { tempList, setTempList, finalList, setFinalList } = useContext(ListContext);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [itemLimit, setItemLimit] = useState(10);
  const [sortCriteria] = useState("");
  const [sortOrder] = useState("ascending");
  const [pageNo, setPageNo] = useState(0);
  const [maxRecords, setMaxRecords] = useState(0);
  const [tempListToDisplay, setTempListToDisplay] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedFinalList = localStorage.getItem("finalList");
    const storedTempList = localStorage.getItem("tempList");
    if (storedFinalList) {
      setFinalList(JSON.parse(storedFinalList));
    }
    if (storedTempList) {
      setTempList(JSON.parse(storedTempList));
    }
  }, [setFinalList, setTempList]);

  useEffect(() => {
    document.documentElement.lang = "en";
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
          return null;
        }

        const { artworkId, gallery } = item[0];
        const artwork = item[1];

        return artwork ? { ...artwork, artworkId, gallery } : null;
      });

      const filteredArtworks = artworks.filter((artwork) => artwork !== null);
      setMaxRecords(filteredArtworks.length);
      setIsEmpty(filteredArtworks.length === 0);
      applyFiltersAndSort(filteredArtworks);
      setIsLoading(false);
    };

    fetchArtworks();
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

  const handleItemLimitChange = (event) => {
    setPageNo(0);
    setItemLimit(Number(event.target.value));
  };

  const handlePreviousPage = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(maxRecords / itemLimit);
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  const handleSaveToFile = async () => {
    const filename = prompt("Enter a filename for your artwork lists:", "artwork_lists.zip");
    if (!filename) return; // Exit if the user cancels or doesn't provide a name

    const zip = new JSZip();
    zip.file("finalList.json", JSON.stringify(finalList));
    zip.file("tempList.json", JSON.stringify(tempList));
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, filename.endsWith('.zip') ? filename : `${filename}.zip`);
    
    alert("Temporary List successfully saved");
  };

  const handleLoadFromFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const zip = new JSZip();
      const data = await zip.loadAsync(file);
      const tempListData = await data.file("tempList.json").async("text");
      setTempList(JSON.parse(tempListData));
      localStorage.setItem("tempList", tempListData);
      
      alert("Temporary List loaded");
    } catch (error) {
      alert("Error loading file.");
      console.error("File loading error:", error);
    }
  };

  if (apiError) {
    return <Error message={apiError.message} />;
  }

  if (isLoading) {
    return (
      <div className="text-center text-white font-bold font-headers text-2xl pt-2 pb-1">
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
      <>
        <div className="flex justify-center">
          <h2 className="font-bold font-headers text-2xl py-3" style={{ maxWidth: "50%", textAlign: "center" }}>
            There are currently no items in your list.
          </h2>
        </div>
        <div className="flex flex-col items-center w-auto">
          <div className="flex w-full">
            <input
              type="file"
              accept=".zip"
              onChange={handleLoadFromFile}
              className="hidden"
              id="loadFileInput"
            />
          </div>
            <button
              onClick={() => document.getElementById('loadFileInput').click()}
              className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Load from File
            </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-center font-bold font-headers text-2xl pt-5 pb-3">
          Your Temporary List
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-3">
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
          <div className="flex flex-col items-center w-auto">
            <div className="flex w-full mb-2">
              <button
                onClick={handleSaveToFile}
                className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save to File
              </button>
            </div>
            <div className="flex w-full">
              <input
                type="file"
                accept=".zip"
                onChange={handleLoadFromFile}
                className="hidden"
                id="loadFileInput"
              />
              <button
                onClick={() => document.getElementById('loadFileInput').click()}
                className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Load from File
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap place-content-evenly pb-10">
          {tempListToDisplay
            .filter((item) => item.gallery === "Victoria and Albert Museum")
            .map((item) => (
              <VAndAArtworkCard
                artwork={item}
                key={item.systemNumber}
                selectedMuseum={item.gallery}
                needsConfirm={true}
                needTempListButton={true}
                needExhibitButton={true}
              />
            ))}
        </div>

        <div className="flex flex-wrap place-content-evenly pb-10">
          {tempListToDisplay
            .filter((item) => item.gallery === "Rijks Museum")
            .map((item) => (
              <RijkArtworkCard
                artwork={item}
                key={item.objectNumber}
                selectedMuseum={item.gallery}
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
            <button onClick={handlePreviousPage} className="mx-2">
              &lt;&lt;
            </button>
            Page No: {pageNo + 1} of {Math.ceil(maxRecords / itemLimit)}
            <button onClick={handleNextPage} className="mx-2">
              &gt;&gt;
            </button>
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
