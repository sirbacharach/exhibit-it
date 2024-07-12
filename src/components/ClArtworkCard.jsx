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
console.log("artwork in ClArtworkCard ", artwork)
  }, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/clevelandartwork/${artwork.systemNumber}`}
        style={{ textDecoration: "none" }}
      >
        {artwork?._images?._primary_thumbnail ? (
          <div className="flex justify-center items-center">
            <>
              <img
                className={`w-auto ${
                  isLoaded ? "block mx-auto" : "hidden"
                } mb-2`}
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
        <h1 className="font-bold">
          {artwork?._primaryTitle
            ? artwork._primaryTitle
            : "no title available"}
        </h1>
        {artwork?._primaryMaker?.name? <p>Artist: {artwork._primaryMaker.name}</p> : <p>Artist: Unknown</p>}
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
