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
  const [currentArtwork] = useState(artwork);

  useEffect(() => {document.documentElement.lang = "en"}, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-03drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/v&aartwork/${artwork.systemNumber}`}
        state={currentArtwork}
        style={{ textDecoration: "none" }}
      >
        {artwork?._images?._primary_thumbnail ? (
          <div className="flex justify-center items-center">
            <>
              <img
                className={`w-auto ${
                  isLoaded ? "block mx-auto" : "hidden"
                } m-4`}
                src={`${artwork._images._iiif_image_base_url}/full/250,/0/default.jpg`}
                alt={artwork._primaryTitle}
                onLoad={() => setIsLoaded(true)}
              />
              {!isLoaded && (
                <img
                  className="w-1/2 mx-auto"
                  src={PlaceholderImage}
                  alt="placeholder"
                  loading="lazy"
                />
              )}
            </>
          </div>
        ) : (
          <div className="text-center bg-titlebackground m-6 font-bold">
            <br></br>
            <p>Image Unavailable</p>
            <br></br>
          </div>
        )}
        <div className="px-4">
          <h1 className="font-bold">
            {artwork?._primaryTitle
              ? artwork._primaryTitle
              : "no title available"}
          </h1>
          {artwork?._primaryMaker?.name ? (
            <p>Artist: {artwork._primaryMaker.name}</p>
          ) : (
            <p>Artist: Unknown</p>
          )}
          {artwork._primaryDate ? (
            <p>Creation Date: {artwork._primaryDate}</p>
          ) : (
            <p>Creation Date: Unknown</p>
          )}
          <p>Culture: {artwork?._primaryPlace || "Culture: Unavailable"}</p>
          <p>
            Type:
            {typeof artwork?.objectType === "string"
              ? ` ${artwork.objectType}`
              : Array.isArray(artwork?.objectType?.iconClassDescription)
              ? artwork.objectType.iconClassDescription.join(", ")
              : "Unavailable"}
          </p>
          <p>Gallery: {selectedMuseum || "Gallery: Unavailable"}</p>
        </div>
      </Link>
      <div className="flex flex-col justify-end place-items-end grow items-center pb-1">
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
