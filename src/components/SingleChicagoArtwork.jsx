import { useContext, useEffect, useState } from "react";
import { getSingleChicagoArtwork } from "./api";
import AddToListButton from "./AddToListButton";
import AddToExhibitButton from "./AddToExhibitButton";
import { ListContext } from "./ListContext";
import { useParams } from "react-router-dom";
import Error from "./Error"; // Uncomment or import Error if not imported

const SingleChicagoArtwork = () => {
  const { tempList, setTempList, finalList, setFinalList } = useContext(ListContext);
  const [chicagoArtwork, setChicagoArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { chicagoArtwork_id } = useParams();
  const [apiError, setApiError] = useState("");


  useEffect(() => {
    console.log(chicagoArtwork_id)
    getSingleChicagoArtwork(chicagoArtwork_id)
      .then((response) => {
        setChicagoArtwork(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, [chicagoArtwork]);

  const handleGoBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  const isInTempList = tempList.some((item) => item.artworkId === chicagoArtwork);
  const isInFinalList = finalList.some((item) => item.artworkId === chicagoArtwork);

  if (isLoading) {
    return <p>Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="relative flex flex-col max-w-4xl mx-auto pb-10 pt-5 mb-4">
        {chicagoArtwork?.images?.web?.url ? (
          <img
            className="w-full"
            src={chicagoArtwork.images.web.url}
            alt={`painting of "${chicagoArtwork.title}"`}
            loading="lazy"
          />
        ) : null}
        <br />
        <h1>Title: {chicagoArtwork?.title ? chicagoArtwork.title : "no title available"}</h1>
        <p>Id: {chicagoArtwork.athena_id}</p>
        <p>Creation Date: {chicagoArtwork.creation_date}</p>
        <p>Culture: {chicagoArtwork.culture}</p>
        <p>Type: {clArtchicagoArtworkwork.type}</p>
        <p>Technique: {chicagoArtwork.technique}</p>
        <br />
        <p>{chicagoArtwork.description}</p>
        <br />
        <div className="flex justify-center place-items-end grow">
          <div className="flex flex-col justify-end place-items-end grow items-center">
              <div>
                <AddToListButton
            artwork={chicagoArtwork}
            selectedMuseum={"Cleveland Museum of Art"}
            needsConfirm={true}
                />
              </div>
              {isInTempList || isInFinalList ? (
  <div>
    <AddToExhibitButton
            artwork={chicagoArtwork}
            selectedMuseum={"Cleveland Museum of Art"}
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
