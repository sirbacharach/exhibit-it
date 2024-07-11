import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToListButton from "./AddToListButton";
import PlaceholderImage from "../assets/img/throbber.gif";
import AddToExhibitButton from "./AddToExhibitButton";
import { ListContext } from "./ListContext";

const ArtistNamesToDisplay = ({ artwork }) => {
  let artistNames = "Artist: Unknown";

  if (artwork.people && artwork.people.length > 0) {
    const artists = artwork.people
      .filter((person) => person.role === "Artist")
      .map((person) => person.displayname);

    if (artists.length > 0) {
      artistNames = `Artist: ${artists.join(", ")}`;
    }
  }

  return <p>{artistNames}</p>;
};

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
        to={`/artworks/clevelandartwork/${artwork.accession_number}`}
        style={{ textDecoration: "none" }}
      >
        {artwork?.images && artwork.images.length > 0 ? (
          <div className="flex justify-center items-center">
            <>
              <img
                className={`w-auto ${
                  isLoaded ? "block mx-auto" : "hidden"
                } mb-2`}
                src={`${artwork.images[0].iiifbaseuri}/full/250,/0/default.jpg`}
                alt={artwork.title}
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
          {artwork?.title ? artwork.title : "no title available"}
        </h1>
        <ArtistNamesToDisplay artwork={artwork} />
        {artwork.dated ? (
          <p>Creation Date: {artwork.dated}</p>
        ) : (
          <p>Creation Date: Unknown</p>
        )}
        <p>Culture: {artwork?.culture || 'Culture: Unavailable'}</p>
        <p>
  Type: 
  {typeof artwork?.classification === 'string' 
    ? artwork.classification 
    : Array.isArray(artwork?.classification?.iconClassDescription)
      ? artwork.classification.iconClassDescription.join(', ')
      : 'Unavailable'}
</p>

        <p>Technique: {artwork?.medium || 'Technique: Unavailable'}</p>
        <p>Gallery: {selectedMuseum || 'Gallery: Unavailable'}</p>
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
