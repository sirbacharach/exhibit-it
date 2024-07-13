import React, { useContext, useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";
import AddToListButton from "./AddToListButton";
import PlaceholderImage from "../assets/img/throbber.gif";
import AddToExhibitButton from "./AddToExhibitButton";

const ChicagoArtworkCard = ({
  artwork,
  selectedMuseum,
  needsConfirm,
  needTempListButton,
  needExhibitButton,
}) => {
  const { tempList, setTempList, finalList, setFinalList } =
    useContext(ListContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Side effect logic if needed
  }, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/chicagoartwork/${artwork.objectNumber}`}
        style={{ textDecoration: "none" }}
      >
        <div className="flex justify-center items-cente">
          {artwork?.webImage?.url ? (
            <>
              <img
                className={`w-auto ${isLoaded ? "block" : "hidden"} mb-2`}
                src={`${artwork.webImage.url}`}
                onLoad={() => setIsLoaded(true)}
                alt={artwork.title}
              />
              {!isLoaded && (
                <img
                  className="w-1/2 ml-auto mr-auto"
                  src={PlaceholderImage}
                  alt="Loading..."
                />
              )}
            </>
          ) : (
            <p>No Image Available</p>
          )}
        </div>
        <h1 className="font-bold">
          {artwork?.title ? artwork.title : "No title available"}
        </h1>
        <p>Id: {artwork.objectNumber}</p>
        <p>
          Creation Date:{" "}
          {artwork.dating?.presentingDate
            ? artwork.dating.presentingDate
            : "Unavailable"}
        </p>
        <p>
          Artist:{" "}
          {artwork.principalOrFirstMaker
            ? artwork.principalOrFirstMaker
            : "Unavailable"}
        </p>
        <p>
          Culture:{" "}
          {artwork.productionPlaces && artwork.productionPlaces.length > 0
            ? artwork.productionPlaces[0]
            : "Unavailable"}
        </p>
        <p>
          Type:{" "}
          {artwork.objectTypes ? artwork.objectTypes.join(", ") : "Unavailable"}
        </p>
        <p>
          Technique:{" "}
          {artwork.techniques && artwork.techniques.length > 0
            ? artwork.techniques.join(", ")
            : "Unavailable"}
        </p>
        <p>Gallery: {selectedMuseum}</p>
        <br />
      </Link>
      <div className="flex flex-col justify-end place-items-end grow items-center">
        {needTempListButton && (
          <AddToListButton
            artwork={artwork}
            tempList={tempList}
            setTempList={setTempList}
            selectedMuseum={selectedMuseum}
            needsConfirm={needsConfirm}
          />
        )}
        {needExhibitButton && (
          <AddToExhibitButton
            artwork={artwork}
            finalList={finalList}
            setFinalList={setFinalList}
            selectedMuseum={selectedMuseum}
            needsConfirm={needsConfirm}
          />
        )}
      </div>
    </li>
  );
};

export default memo(ChicagoArtworkCard);
