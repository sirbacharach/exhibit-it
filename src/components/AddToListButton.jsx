import React, { useContext, useEffect, useState } from "react";
import { ListContext } from "./ListContext";

const AddToListButton = ({ artwork, selectedMuseum, needsConfirm }) => {
  const [isInList, setIsInList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { tempList, setTempList } = useContext(ListContext);

  useEffect(() => {
    const isInList =
      tempList &&
      Array.isArray(tempList) &&
      tempList.some((item) =>
        selectedMuseum === "Victoria and Albert Museum"
          ? item[0].artworkId === artwork.systemNumber
          : item[0].artworkId === artwork.objectNumber
      );
    setIsInList(isInList);
  }, [tempList, artwork.systemNumber, artwork.objectNumber, selectedMuseum]);

  const saveToLocalStorage = (list) => {
    localStorage.setItem("tempList", JSON.stringify(list));
  };

  const handleToggle = () => {
    if (isInList) {
      if (needsConfirm) {
        setShowConfirm(true);
      } else {
        const updatedList = tempList.filter((item) =>
          selectedMuseum === "Victoria and Albert Museum"
            ? item[0].artworkId !== artwork.systemNumber
            : item[0].artworkId !== artwork.objectNumber
        );
        setTempList(updatedList);
        saveToLocalStorage(updatedList);
      }
    } else {
      const updatedList = [
        ...tempList,
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
      setTempList(updatedList);
      saveToLocalStorage(updatedList);
    }
    setIsInList(!isInList);
  };

  const handleConfirmRemove = () => {
    const updatedList = tempList.filter((item) =>
      selectedMuseum === "Victoria and Albert Museum"
        ? item[0].artworkId !== artwork.systemNumber
        : item[0].artworkId !== artwork.objectNumber
    );

    setTempList(updatedList);
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
