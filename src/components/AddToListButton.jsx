import React, { useEffect, useState } from "react";

const AddToListButton = ({
  artwork,
  tempList,
  setTempList,
  selectedMuseum,
  needsConfirm,
}) => {
  const [isInList, setIsInList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const isInList = tempList.some((item) =>
      selectedMuseum === "Cleveland Museum of Art"
        ? item.artworkId === artwork.accession_number
        : item.artworkId === artwork.id
    );
    setIsInList(isInList);
  }, [tempList, artwork.accession_number, artwork.id, selectedMuseum]);

  const handleToggle = () => {
    if (isInList) {
      if (needsConfirm) {
        setShowConfirm(true);
      } else {
        setTempList((prevList) =>
          selectedMuseum === "Cleveland Museum of Art"
            ? prevList.filter(
                (item) => item.artworkId !== artwork.accession_number
              )
            : prevList.filter((item) => item.artworkId !== artwork.id)
        );
      }
    } else {
      setTempList((prevList) =>
        selectedMuseum === "Cleveland Museum of Art"
          ? [
              ...prevList,
              { artworkId: artwork.accession_number, gallery: selectedMuseum },
            ]
          : [...prevList, { artworkId: artwork.id, gallery: selectedMuseum }]
      );
    }
    setIsInList(!isInList); // Toggle state
  };

  const handleConfirmRemove = () => {
    setTempList((prevList) =>
      selectedMuseum === "Cleveland Museum of Art"
        ? prevList.filter((item) => item.artworkId !== artwork.accession_number)
        : prevList.filter((item) => item.artworkId !== artwork.id)
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
            Are you sure you want to remove this artwork from your temporary
            list?
          </p>
          <button
            onClick={handleConfirmRemove}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelRemove}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={`font-bold py-2 px-4 rounded ${
            isInList
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white`}
          onClick={handleToggle}
        >
          {isInList ? "Remove from List" : "Add to List"}
        </button>
      )}
    </>
  );
};

export default AddToListButton;
