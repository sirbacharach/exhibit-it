import React, { useEffect, useState } from 'react';

const AddToExhibitButton = ({ clArtwork, finalList, setFinalList, selectedMuseum, needsConfirm, isFromExhibit}) => {
  const [isInList, setIsInList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // State to manage confirmation prompt

  useEffect(() => {
    const isInList = finalList.some(item => item.artworkId === clArtwork.accession_number);
    setIsInList(isInList);
  }, [finalList, clArtwork.accession_number]);

  const handleToggle = () => {
    if (isInList) {
      if (needsConfirm) {
        setShowConfirm(true); // Show confirmation prompt
      } else {
        setFinalList(prevList => prevList.filter(item => item.artworkId !== clArtwork.accession_number));
      }
    } else {
      setFinalList(prevList => [...prevList, { artworkId: clArtwork.accession_number, gallery: selectedMuseum }]);
    }
  };

  const handleConfirmRemove = () => {
    setFinalList(prevList => prevList.filter(item => item.artworkId !== clArtwork.accession_number));
    setShowConfirm(false); // Hide confirmation prompt after removal
  };

  const handleCancelRemove = () => {
    setShowConfirm(false); // Hide confirmation prompt without removing
  };

  return (
    <>
      {showConfirm ? (
        <div className="confirm-remove">
          <p className="bg-white p-1 pl-2 mb-2 rounded-lg">Are you sure you want to remove this artwork from your exhibition?</p>
          <button onClick={handleConfirmRemove} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Confirm
          </button>
          <button onClick={handleCancelRemove} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={`font-bold py-2 px-4 rounded mt-2 ${
            isInList ? 'bg-red-500 hover:bg-red-700 drop-shadow-md ' : 'bg-blue-500 hover:bg-blue-700 drop-shadow-md'
          } text-white`}
          onClick={handleToggle}
        >
          {isInList ? 'Remove from Exhibition' : 'Add to Exhibition'}
        </button>
      )}
    </>
  );
};

export default AddToExhibitButton;
