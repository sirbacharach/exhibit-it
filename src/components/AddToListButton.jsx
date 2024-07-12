import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "./ListContext";

const AddToListButton = ({ artwork, selectedMuseum, needsConfirm }) => {
  const [isInList, setIsInList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { tempList, setTempList } = useContext(ListContext);

  useEffect(() => {
    const isInList = tempList.some((item) =>
      selectedMuseum === "Cleveland Museum of Art"
        ? item[0].artworkId === artwork.systemNumber
        : item[0].artworkId === artwork.objectNumber
    );
    setIsInList(isInList);
  }, [tempList, artwork.systemNumber, artwork.objectNumber, selectedMuseum]);

  const handleToggle = () => {
    if (isInList) {
      if (needsConfirm) {
        setShowConfirm(true);
      } else {
        setTempList((prevList) =>
          prevList.filter((item) =>
            selectedMuseum === "Cleveland Museum of Art"
              ? item[0].artworkId !== artwork.systemNumber
              : item[0].artworkId !== artwork.objectNumber
          )
        );
      }
    } else {
      setTempList((prevList) => [
        ...prevList,
        [
          {
            artworkId: selectedMuseum === "Cleveland Museum of Art"
              ? artwork.systemNumber
              : artwork.objectNumber,
            gallery: selectedMuseum,
          },
          artwork, // Artwork array as item 1
        ],
      ]);
    }
    setIsInList(!isInList); // Toggle state
  };

  const handleConfirmRemove = () => {
    setTempList((prevList) =>
      prevList.filter((item) =>
        selectedMuseum === "Cleveland Museum of Art"
          ? item[0].artworkId !== artwork.systemNumber
          : item[0].artworkId !== artwork.objectNumber
      )
    );
    setShowConfirm(false);
  };

  const handleCancelRemove = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm ? (
        <div className="confirm-remove">
          <p className="bg-white p-1 pl-2 mb-2 rounded-lg">
            Are you sure you want to remove this artwork from your temporary list?
          </p>
          <button
            onClick={handleConfirmRemove}
            className="bg-red-700 hover:bg-red-900 font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelRemove}
            className="bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={`font-bold py-2 px-4 rounded ${
            isInList
              ? "bg-red-700 hover:bg-red-900"
              : "bg-blue-700 hover:bg-blue-900"
          }`}
          onClick={handleToggle}
        >
          {isInList ? "Remove from List" : "Add to List"}
        </button>
      )}
    </>
  );
};

export default AddToListButton;
