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
    console.log(chicagoartwork_id);
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
console.log(tempList)
console.log(chicagoartwork_id)
console.log(isInTempList)
console.log(isInFinalList)

  if (isLoading) {
    return <p>Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="relative flex flex-col max-w-4xl mx-auto pb-10 pt-5 mb-4">
        {chicagoArtwork?.thumbnail?.lqip ? (
          <div className="flex justify-center items-center">
            <div>
              <img
                className={`w-auto ${isLoaded ? "block" : "hidden"}`}
                src={`https://www.artic.edu/iiif/2/${chicagoArtwork.image_id}/full/843,/0/default.jpg`}
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
        <h1>
          {chicagoArtwork?.title ? chicagoArtwork.title : "no title available"}
        </h1>
        <p>Creation Date: {chicagoArtwork.date_end}</p>
        <p>Artist: {chicagoArtwork.artist_dtitle}</p>
        <p>Culture: {chicagoArtwork.culture}</p>
        {chicagoArtwork.classification_title ? (
          <p>Type: {chicagoArtwork.classification_title}</p>
        ) : null}
        {chicagoArtwork.technique_titles ? (
          <p>Technique: {chicagoArtwork.technique_titles[0]}</p>
        ) : null}
        <p>Gallery: Art Institute of Chicago</p>
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
