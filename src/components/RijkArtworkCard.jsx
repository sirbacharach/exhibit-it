import React, { useContext, useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";
import AddToListButton from "./AddToListButton";
import PlaceholderImage from "../assets/img/throbber.gif";
import AddToExhibitButton from "./AddToExhibitButton";



const RijkArtworkCard = ({
  artwork,
  selectedMuseum,
  needsConfirm,
  needTempListButton,
  needExhibitButton,
}) => {
  const { tempList, setTempList, finalList, setFinalList } =
    useContext(ListContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [resizedImage, setResizedImage] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (artwork?.webImage?.url)
      setResizedImage(artwork.webImage.url.slice(0, -3) + "=w250");
    document.documentElement.lang = "nl"
  }, [tempList]);
  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/Rijkartwork/${artwork.objectNumber}`}
        style={{ textDecoration: "none" }}
      >
        <div className="flex justify-center items-cente">
          {resizedImage ? (
            <>
              <img
                className={`w-auto ${isLoaded ? "block" : "hidden"} mb-2`}
                src={`${resizedImage}`}
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
        <p>Id: {artwork.id}</p>
        <p>
          {artwork?.longTitle
            ? "Dated: " +
              (artwork.longTitle.includes("ca.")
                ? artwork.longTitle
                    .substring(artwork.longTitle.indexOf("ca."))
                    .trim()
                : "No date available")
            : "No date available"}
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
            ? artwork.productionPlaces.map((place, index) => (
                <span key={index}>
                  {place}
                  {index < artwork.productionPlaces.length - 1 ? ", " : ""}
                </span>
              ))
            : "Unavailable"}
        </p>{" "}
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

export default RijkArtworkCard;
