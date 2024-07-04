import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";
import { useContext, useEffect, useState } from "react";
import AddToListButton from "./AddToListButton";
import PlaceholderImage from '../assets/img/throbber.gif'; // Import a placeholder image
import AddToExhibitButton from "./AddToExhibitButton";
// import LazyLoad from "react-lazyload";

const ClArtworkCard = ({ clArtwork, selectedMuseum, needsConfirm }) => {
  const { tempList, setTempList } = useContext(ListContext);
  const { finalList, setFinalList } = useContext(ListContext)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(tempList);
  }, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/artworks/${clArtwork.accession_number}`}
        className="all-articles light-font-colour"
        style={{ textDecoration: "none" }}
      >
        {clArtwork?.images?.web?.url ? (
          <>
            <img
              className={`w-auto ${isLoaded ? 'block' : 'hidden'}`}
              src={clArtwork.images.web.url}
              srcSet={`${clArtwork.images.web.url} 1x, ${clArtwork.images.web.url} 2x`}
              alt={`painting of "${clArtwork.title}"`}
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
        <h1>{clArtwork?.title ? clArtwork.title : "no title available"}</h1>
        <p>Creation Date: {clArtwork.creation_date}</p>
        <p>Culture: {clArtwork.culture}</p>
        <p>Type: {clArtwork.type}</p>
        <p>Technique: {clArtwork.technique}</p>
        <p>Gallery: {selectedMuseum}</p>
        <br />
      </Link>
      <div className="flex flex-col justify-end place-items-end grow items-center">
        <div>
        <AddToListButton
          clArtwork={clArtwork}
          tempList={tempList}
          setTempList={setTempList}
          selectedMuseum={selectedMuseum}
          needsConfirm={needsConfirm}
        />
        </div>
        <div>
        <AddToExhibitButton
          clArtwork={clArtwork}
          finalList={finalList}
          setFinalList={setFinalList}
          selectedMuseum={selectedMuseum}
          needsConfirm={needsConfirm}
        />
        </div>
      </div>

    </li>
  );
};

export default ClArtworkCard;
