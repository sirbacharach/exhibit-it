import { useContext, useEffect, useState } from "react";
import { getSingleClArtwork } from "./api";
import AddToListButton from "./AddToListButton";
import AddToExhibitButton from "./AddToExhibitButton";
import { ListContext } from "./ListContext";
import { useParams } from "react-router-dom";
import Error from "./Error"; // Uncomment or import Error if not imported
import PlaceholderImage from "../assets/img/throbber.gif";

const SingleClArtwork = () => {
  const { tempList, setTempList, finalList, setFinalList } =
    useContext(ListContext);
  const [clArtwork, setClArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { clartwork_id } = useParams();
  const [apiError, setApiError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSingleClArtwork(clartwork_id)
      .then((response) => {
        setClArtwork(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, [clartwork_id]);

  const handleGoBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  const isInTempList = tempList.some(
    (item) => item.artworkId.toString() === clartwork_id
  );
  const isInFinalList = finalList.some(
    (item) => item.artworkId.toString() === clartwork_id
  );

  if (isLoading) {
    return <p>Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="relative flex flex-col max-w-4xl mx-auto pb-10 pt-5 mb-4">
        {clArtwork?.images?.web?.url ? (
          <div className="flex justify-center items-center">
            <div>
              <img
                className="w-full "
                src={clArtwork.images.web.url}
                onLoad={() => setIsLoaded(true)}
                alt={clArtwork.title}
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

        <br />
        <h1>
          Title: {clArtwork?.title ? clArtwork.title : "no title available"}
        </h1>
        <p>Id: {clArtwork.athena_id}</p>
        <p>Creation Date: {clArtwork.creation_date}</p>
        <p>Culture: {clArtwork.culture}</p>
        <p>Type: {clArtwork.type}</p>
        <p>Technique: {clArtwork.technique}</p>
        <br />
        <p>{clArtwork.description}</p>
        <br />
        <div className="flex justify-center place-items-end grow">
          <div className="flex flex-col justify-end place-items-end grow items-center">
            <div>
              <AddToListButton
                artwork={clArtwork}
                selectedMuseum={"Cleveland Museum of Art"}
                needsConfirm={true}
              />
            </div>
            {isInTempList || isInFinalList ? (
              <div>
                <AddToExhibitButton
                  artwork={clArtwork}
                  selectedMuseum={"Cleveland Museum of Art"}
                  needsConfirm={true}
                />
              </div>
            ) : null}
          </div>
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
              <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center flex justify-between">
                <div className="flex items-center text-left w-20 pl-2">
                  List Items: {tempList.length}
                </div>
                <div className="flex items-center justify-center w-60">
                  <button onClick={handleGoBack}>Go Back</button>
                </div>
                <div className="flex items-center justify-end text-right w-20 pr-2">
                  Exhibition Items: {finalList.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClArtwork;
