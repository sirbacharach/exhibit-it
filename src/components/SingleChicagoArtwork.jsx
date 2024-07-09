import { useContext, useEffect, useState } from "react";
import { getSingleChicagoArtwork } from "./api";
import AddToListButton from "./AddToListButton";
import AddToExhibitButton from "./AddToExhibitButton";
import { ListContext } from "./ListContext";
import { useParams } from "react-router-dom";
import PlaceholderImage from "../assets/img/throbber.gif";
import Error from "./Error"; // Uncomment or import Error if not imported

const SingleChicagoArtwork = () => {
  const { tempList, setTempList, finalList, setFinalList } =
    useContext(ListContext);
  const [chicagoArtwork, setChicagoArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { chicagoartwork_id } = useParams();
  const [apiError, setApiError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSingleChicagoArtwork(chicagoartwork_id)
      .then((response) => {
        setChicagoArtwork(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, [chicagoartwork_id]);

  const handleGoBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  const isInTempList = tempList.some((item) => item.artworkId.toString() === chicagoartwork_id);
  const isInFinalList = finalList.some((item) => item.artworkId.toString() === chicagoartwork_id);


  if (isLoading) {
    return <p>Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="relative flex flex-col max-w-4xl mx-auto pb-10 pt-5 mb-4">
      {chicagoArtwork?.webImage?.url ? (
          <div className="flex justify-center items-center">
            <div>
              <img
                className={`w-auto ${isLoaded ? "block" : "hidden"}`}
                src={chicagoArtwork.webImage.url}
                onLoad={() => setIsLoaded(true)}
                alt={`Painting of ${chicagoArtwork.title}`}
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
          {chicagoArtwork?.title ? chicagoArtwork.title : "no title available"}
        </h1>
        <div className="border-b-titlebackground border-b-2"></div>
        <p>Id: {chicagoArtwork.objectNumber}</p>
        <div className="border-b-titlebackground border-b-2"></div>
        {chicagoArtwork.dating?.presentingDate ? (
          <p>Creation Date: {chicagoArtwork.dating.presentingDate}</p>
        ) : (
          <p>Creation Date: Unavailable</p>
        )}
        <div className="border-b-titlebackground border-b-2"></div>
        {chicagoArtwork.principalOrFirstMaker? (
  <p>Artist: {chicagoArtwork.principalOrFirstMaker}</p>
) : (
  <p>Artist: Unavailable</p>
)}
        <div className="border-b-titlebackground border-b-2"></div>
        {chicagoArtwork.productionPlaces && chicagoArtwork.productionPlaces.length > 0? (
          <p>Culture: {chicagoArtwork.productionPlaces[0]}</p>
        ) : (
          <p>Culture: Unavailable</p>
        )}
        <div className="border-b-titlebackground border-b-2"></div>
        {chicagoArtwork.objectTypes ? (
          <p>Type: {chicagoArtwork.objectTypes}</p>
        ) : (
          <p>Type: Unavailable</p>
        )}
        <div className="border-b-titlebackground border-b-2"></div>
        {chicagoArtwork.description? (
          <p>Description: {chicagoArtwork.description}</p>
        ) : (
          <p>Description: Unavailable</p>
        )}
        <br />
        <div className="flex justify-center place-items-end grow">
          <div className="flex flex-col justify-end place-items-end grow items-center">
            <div>
              <AddToListButton
                artwork={chicagoArtwork}
                selectedMuseum={"Art Institute of Chicago"}
                needsConfirm={true}
              />
            </div>
            {isInTempList || isInFinalList ? (
              <div>
                <AddToExhibitButton
                  artwork={chicagoArtwork}
                  selectedMuseum={"Art Institute of Chicago"}
                  needsConfirm={true}
                />
              </div>
            ) : null}
          </div>
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center text-white">
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

export default SingleChicagoArtwork;
