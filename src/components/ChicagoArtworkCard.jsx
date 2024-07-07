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
  const { tempList, setTempList, finalList, setFinalList } = useContext(ListContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // console.log("tempList within ChicagoArtworkCard", tempList);
    // console.log("artwork within ChicagoArtworkCard", artwork);
  }, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/chicagoartwork/${artwork.id}`}
        className="all-articles light-font-colour"
        style={{ textDecoration: "none" }}
      >
        {artwork?.thumbnail?.lqip ? (
           <div className="flex justify-center items-center">
            <div>
              <img
                className={`w-auto ${isLoaded ? "block" : "hidden"}`}
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt="Base64 Image"
                onLoad={() => setIsLoaded(true)}
              />
              {!isLoaded && <div>Loading...</div>}
            </div>
            {!isLoaded && (
              <img
                className="w-1/2 ml-auto mr-auto"
                src={PlaceholderImage}
                alt="placeholder"
                loading="lazy"
              />
            )}
          </div>
        ) : null}
        <h1>{artwork?.title ? artwork.title : "no title available"}</h1>
        <p>Creation Date: {artwork.date_end}</p>
        <p>Artist: {artwork.artist_dtitle}</p>
        <p>Culture: {artwork.culture}</p>
        {artwork.classification_title ? <p>Type: {artwork.classification_title}</p> : null}
        {artwork.technique_titles ? <p>Technique: {artwork.technique_titles[0]}</p> : null}
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
