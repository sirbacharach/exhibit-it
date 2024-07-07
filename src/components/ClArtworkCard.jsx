import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToListButton from "./AddToListButton";
import PlaceholderImage from "../assets/img/throbber.gif";
import AddToExhibitButton from "./AddToExhibitButton";
import { ListContext } from "./ListContext";

const ClArtworkCard = ({
  artwork,
  selectedMuseum,
  needsConfirm,
  needTempListButton,
  needExhibitButton,
}) => {
  const { tempList } = useContext(ListContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("artwork in ClArtworkCard", artwork);
  }, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/${artwork.accession_number}`}
        className="all-articles light-font-colour"
        style={{ textDecoration: "none" }}
      >
        {artwork?.images?.web?.url ? (
          <>
            <img
              className={`w-auto ${isLoaded ? "block" : "hidden"}`}
              src={artwork.images.web.url}
              srcSet={`${artwork.images.web.url} 1x, ${artwork.images.web.url} 2x`}
              alt={`painting of "${artwork.title}"`}
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <img
                className="w-1/2 ml-auto mr-auto"
                src={PlaceholderImage}
                alt="placeholder"
                loading="lazy"
              />
            )}
          </>
        ) : null}
        <h1>{artwork?.title ? artwork.title : "no title available"}</h1>
        <p>Creation Date: {artwork.creation_date}</p>
        <p>Culture: {artwork.culture}</p>
        <p>Type: {artwork.type}</p>
        <p>Technique: {artwork.technique}</p>
        <p>Gallery: {selectedMuseum}</p>
        <br />
      </Link>
      <div className="flex flex-col justify-end place-items-end grow items-center">
        {needTempListButton && artwork && (
          <AddToListButton
            artwork={artwork}
            selectedMuseum={selectedMuseum}
            needsConfirm={needsConfirm}
          />
        )}
        {needExhibitButton && artwork && (
          <AddToExhibitButton
            artwork={artwork}
            selectedMuseum={selectedMuseum}
            needsConfirm={needsConfirm}
          />
        )}
      </div>
    </li>
  );
};

export default ClArtworkCard;
