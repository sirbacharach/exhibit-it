import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";
import { useContext, useEffect, useState } from "react";
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
    // console.log("tempList within ChicagoArtworkCard", tempList);
    // console.log("artwork within ChicagoArtworkCard", artwork);
  }, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/chicagoartwork/${artwork.objectNumber}`}
        style={{ textDecoration: "none" }}
      >
        {artwork?.webImage?.url ? (
          <div className="flex justify-center items-center">
            <div>
              <img
                className={`w-auto ${isLoaded ? "block" : "hidden"} mb-2`}
                src={artwork.webImage.url}
                onLoad={() => setIsLoaded(true)}
                alt={artwork.title}
              />
              {!isLoaded && <div>Loading...</div>}
            </div>
            {!isLoaded && (
              <img
                className="w-1/2 ml-auto mr-auto"
                src={PlaceholderImage}
                alt="No Image loaded or available"
                loading="lazy"
              />
            )}
          </div>
        ) : (
          <p>No Image Available</p>
        )}
        <h1 className="font-bold">
          {artwork?.title ? artwork.title : "no title available"}
        </h1>

        <p>Id: {artwork.objectNumber}</p>

        {artwork.dating?.presentingDate ? (
          <p>Creation Date: {artwork.dating.presentingDate}</p>
        ) : (
          <p>Creation Date: Unavailable</p>
        )}

        {artwork.principalOrFirstMaker? (
  <p>Artist: {artwork.principalOrFirstMaker}</p>
) : (
  <p>Artist: Unavailable</p>
)}

        {artwork.productionPlaces && artwork.productionPlaces.length > 0? (
          <p>Culture: {artwork.productionPlaces[0]}</p>
        ) : (
          <p>Culture: Unavailable</p>
        )}

        {artwork.objectTypes ? (
          <p>Type: {artwork.objectTypes}</p>
        ) : (
          <p>Type: Unavailable</p>
        )}

        {artwork.techniques && artwork.techniques.length > 0 ? (
          <p>Technique: {artwork.techniques}</p>
        ) : <p>Technique: Unavailable</p>}

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

export default ChicagoArtworkCard;
