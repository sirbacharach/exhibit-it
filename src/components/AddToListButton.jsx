import React, { useEffect, useState } from 'react';

const AddToListButton = ({ clArtwork, tempList, setTempList, selectedMuseum, needsConfirm }) => {
  const [isInList, setIsInList] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // State to manage confirmation prompt

  useEffect(() => {
    const isInList = tempList.some(item => item.artworkId === clArtwork.accession_number);
    setIsInList(isInList);
  }, [tempList, clArtwork.accession_number]);

  const handleToggle = () => {
    if (isInList) {
      if (needsConfirm) {
        setShowConfirm(true); // Show confirmation prompt
      } else {
        setTempList(prevList => prevList.filter(item => item.artworkId !== clArtwork.accession_number));
      }
    } else {
      setTempList(prevList => [...prevList, { artworkId: clArtwork.accession_number, gallery: selectedMuseum }]);
    }
  };

  const handleConfirmRemove = () => {
    setTempList(prevList => prevList.filter(item => item.artworkId !== clArtwork.accession_number));
    setShowConfirm(false); // Hide confirmation prompt after removal
  };

  const handleCancelRemove = () => {
    setShowConfirm(false); // Hide confirmation prompt without removing
  };

  return (
    <>
      {showConfirm ? (
        <div className="confirm-remove">
          <p className="bg-white p-1 pl-2 mb-2 rounded-lg">Are you sure you want to remove this artwork from the list?</p>
          <button onClick={handleConfirmRemove} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Confirm
          </button>
          <button onClick={handleCancelRemove} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={`font-bold py-2 px-4 rounded ${
            isInList ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
          } text-white`}
          onClick={handleToggle}
        >
          {isInList ? 'Remove from List' : 'Add to List'}
        </button>
      )}
    </>
  );
};

export default AddToListButton;
