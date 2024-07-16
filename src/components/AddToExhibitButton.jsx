import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "./ListContext";

const AddToExhibitButton = ({ artwork, selectedMuseum, needsConfirm }) => {
  const [isInList, setIsInList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { finalList, setFinalList } = useContext(ListContext);

  useEffect(() => {
    const isInList =
      finalList &&
      Array.isArray(finalList) &&
      finalList.some((item) =>
        selectedMuseum === "Victoria and Albert Museum"
          ? item[0].artworkId === artwork.systemNumber
          : item[0].artworkId === artwork.objectNumber
      );
    setIsInList(isInList);
  }, [finalList, artwork.systemNumber, artwork.objectNumber, selectedMuseum]);

  const saveToLocalStorage = (list) => {
    localStorage.setItem("finalList", JSON.stringify(list));
  };

  const handleToggle = () => {
    if (isInList) {
      if (needsConfirm) {
        setShowConfirm(true);
      } else {
        const updatedList = finalList.filter((item) =>
          selectedMuseum === "Victoria and Albert Museum"
            ? item[0].artworkId !== artwork.systemNumber
            : item[0].artworkId !== artwork.objectNumber
        );
        setFinalList(updatedList);
        saveToLocalStorage(updatedList);
      }
    } else {
      const updatedList = [
        ...finalList,
        [
          {
            artworkId:
              selectedMuseum === "Victoria and Albert Museum"
                ? artwork.systemNumber
                : artwork.objectNumber,
            gallery: selectedMuseum,
          },
          artwork,
        ],
      ];
      setFinalList(updatedList);
      saveToLocalStorage(updatedList);
    }
    setIsInList(!isInList); // Toggle state
  };

  const handleConfirmRemove = () => {
    const updatedList = finalList.filter((item) =>
      selectedMuseum === "Victoria and Albert Museum"
        ? item[0].artworkId !== artwork.systemNumber
        : item[0].artworkId !== artwork.objectNumber
    );
    setFinalList(updatedList);
    saveToLocalStorage(updatedList);
    setShowConfirm(false);
  };

  const handleCancelRemove = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm ? (
        <div className="confirm-remove">
          <p className="bg-white p-1 px-4 m-2 rounded-lg text-black">
            Are you sure you want to remove this artwork from your temporary
            list?
          </p>
          <button
            onClick={handleConfirmRemove}
            className="bg-red-700 hover:bg-red-900 font-bold py-2 px-4 rounded m-2"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelRemove}
            className="bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4 rounded m-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={`font-bold py-2 px-4 rounded m-2 ${
            isInList
              ? "bg-orange-800 hover:bg-orange-900"
              : "bg-yellow-400 hover:bg-yellow-600 text-black"
          }`}
          onClick={handleToggle}
        >
          {isInList ? "Remove from Exhibition" : "Add to Exhibition"}
        </button>
      )}
    </>
  );
};

export default AddToExhibitButton;
