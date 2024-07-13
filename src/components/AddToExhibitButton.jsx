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

  const handleToggle = () => {
    if (isInList) {
      if (needsConfirm) {
        setShowConfirm(true);
      } else {
        setFinalList((prevList) =>
          prevList.filter((item) =>
            selectedMuseum === "Victoria and Albert Museum"
              ? item[0].artworkId !== artwork.systemNumber
              : item[0].artworkId !== artwork.objectNumber
          )
        );
      }
    } else {
      setFinalList((prevList) => [
        ...prevList,
        [
          {
            artworkId:
              selectedMuseum === "Victoria and Albert Museum"
                ? artwork.systemNumber
                : artwork.objectNumber,
            gallery: selectedMuseum,
          },
          artwork, // Artwork object as item 1
        ],
      ]);
    }
    setIsInList(!isInList); // Toggle state
  };

  const handleConfirmRemove = () => {
    setFinalList((prevList) =>
      prevList.filter((item) =>
        selectedMuseum === "Victoria and Albert Museum"
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
              ? "bg-red-700 hover:bg-red-900"
              : "bg-blue-700 hover:bg-blue-900"
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
