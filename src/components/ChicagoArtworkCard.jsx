import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";
import { useContext, useEffect, useState } from "react";
import AddToListButton from "./AddToListButton";
import PlaceholderImage from "../assets/img/throbber.gif"; // Import a placeholder image
import AddToExhibitButton from "./AddToExhibitButton";
// import LazyLoad from "react-lazyload";

const ChicagoArtworkCard = ({
  clArtwork,
  selectedMuseum,
  needsConfirm,
  needTempListButton,
  needExhibitButton,
}) => {
  const { tempList, setTempList } = useContext(ListContext);
  const { finalList, setFinalList } = useContext(ListContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  }, [tempList]);

  
  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/${clArtwork.accession_number}`}
        className="all-articles light-font-colour"
        style={{ textDecoration: "none" }}
      >
        {clArtwork?.thumbnail?.lqip? (
          <>
    <div>
      <img
        className={`w-auto ${isLoaded ? "block" : "hidden"}`}
        src={`https://www.artic.edu/iiif/2/${clArtwork.image_id}/full/843,/0/default.jpg`}
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
          </>
        ) : null}
        <h1>{clArtwork?.title ? clArtwork.title : "no title available"}</h1>
        <p>Creation Date: {clArtwork.date_end}</p>
        <p>Artist: {clArtwork.artist_dtitle}</p>
        <p>Culture: {clArtwork.culture}</p>
        {clArtwork.classification_title? <p>Type: {clArtwork.classification_title}</p> : null}
        {clArtwork.technique_titles ? <p>Technique: {clArtwork.technique_titles[0]}</p> : null }
        <p>Gallery: {selectedMuseum}</p>
        <br />
      </Link>
      <div className="flex flex-col justify-end place-items-end grow items-center">
        {needTempListButton ? (
          <div>
            <AddToListButton
              clArtwork={clArtwork}
              tempList={tempList}
              setTempList={setTempList}
              selectedMuseum={selectedMuseum}
              needsConfirm={needsConfirm}
            />
          </div>
        ) : null}
        {needExhibitButton ? (
          <div>
            <AddToExhibitButton
              clArtwork={clArtwork}
              finalList={finalList}
              setFinalList={setFinalList}
              selectedMuseum={selectedMuseum}
              needsConfirm={needsConfirm}
            />
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default ChicagoArtworkCard;
