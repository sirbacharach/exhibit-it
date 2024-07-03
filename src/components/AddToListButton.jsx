import React, { useEffect, useState } from 'react';

const AddToListButton = ({ clArtwork, tempList, setTempList, selectedMuseum }) => {
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    const isInList = tempList.some(item => item.artworkId === clArtwork.accession_number);
    setIsInList(isInList);
  }, [tempList, clArtwork.accession_number]);

  const handleToggle = () => {
    if (isInList) {
      setTempList(prevList => prevList.filter(item => item.artworkId !== clArtwork.accession_number));
    } else {
      setTempList(prevList => [...prevList, { artworkId: clArtwork.accession_number, gallery: selectedMuseum }]);
    }
  };

  return (
    <button
      className={`font-bold py-2 px-4 rounded ${
        isInList ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
      } text-white`}
      onClick={handleToggle}
    >
      {isInList ? 'Remove from List' : 'Add to List'}
    </button>
  );
};

export default AddToListButton;
