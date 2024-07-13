import { useContext, useEffect, useState } from "react";
import { getSingleClArtwork } from "./api";
import AddToListButton from "./AddToListButton";
import AddToExhibitButton from "./AddToExhibitButton";
import { ListContext } from "./ListContext";
import { useLocation, useParams } from "react-router-dom";
import Error from "./Error"; // Uncomment or import Error if not imported
import PlaceholderImage from "../assets/img/throbber.gif";

const SingleClArtwork = () => {
  const { tempList, setTempList, finalList, setFinalList } = useContext(ListContext);
  const [clArtwork, setClArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { clartwork_id } = useParams();
  const [apiError, setApiError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [recordDetails, setRecordDetails] = useState({ artworkId: "", gallery: "" });
  const [currentArtwork, setCurrentArtwork] = useState(useLocation().state)
  
  useEffect(() => {
    getSingleClArtwork(clartwork_id)
    .then((response) => {
      setClArtwork(response);
      setIsLoading(false);
      return response
    }).then((newArtwork)=>{
      if (newArtwork) {
        const newRecordDetails = {
          artworkId: newArtwork.systemNumber || "placeholderId",
          gallery: newArtwork.systemNumber ? "Cleveland Museum of Art" : "Art Institute of Chicago",
        };
        setRecordDetails(newRecordDetails);
      }
    })
    .catch((err) => {
      setApiError(err);
      setIsLoading(false);
    });
  }, [clartwork_id]);
  
   console.log("record details = ",recordDetails)
  const handleGoBack = () => {
    window.history.back();
  };

  const isInTempList =
    tempList &&
    Array.isArray(tempList) &&
    tempList.some((item) => item[0]?.artworkId === clartwork_id);

  const isInFinalList =
    finalList &&
    Array.isArray(finalList) &&
    finalList[1]?.some((item) => item[0]?.artworkId === clartwork_id);

  if (isLoading) {
    return <p>Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="relative flex flex-col max-w-4xl mx-auto pb-10 pt-5 mb-4">
        {clArtwork?.images[0] ? (
          <div className="flex justify-center items-center">
            <>
              <img
                className={`w-auto ${isLoaded ? "block mx-auto" : "hidden"} mb-2`}
                src={`https://framemark.vam.ac.uk/collections/${clArtwork.images[0]}/full/full/0/default.jpg`}
                alt={clArtwork._primaryTitle}
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
            <br />
            <p>Image Unavailable</p>
            <br />
          </div>
        )}

        <br />
        <h1 className="font-bold">
          Title: {clArtwork?.titles[0] ? clArtwork.titles[0].title : "no title available"}
        </h1>
        {clArtwork?.artistMakerPerson?.length > 0 ? (
          <p>
            Artist:{" "}
            {clArtwork.artistMakerPerson.map((artist, index) => (
              <span key={artist.name.text}>
                {artist.name.text}
                {index < clArtwork.artistMakerPerson.length - 1 ? " | " : ""}
              </span>
            ))}
          </p>
        ) : (
          <p>Artist: Unknown</p>
        )}
        <p>Id: {clArtwork.accessionNumber || "Id: Unavailable"}</p>
        <p>Type: {clArtwork.objectType || "Type: Unavailable"}</p>
        <p>
          Materials and Techniques:{" "}
          {Array.isArray(clArtwork.materialsAndTechniques) &&
          clArtwork.materialsAndTechniques.length > 0
            ? clArtwork.materialsAndTechniques.join(", ")
            : "Materials and Techniques: Unavailable"}
        </p>
        <br />
        <p>
          {clArtwork.briefDescription
            ? clArtwork.briefDescription.replace(/<i>|<\/i>/g, "")
            : "Unavailable"}
        </p>
        <div className="flex flex-col justify-end place-items-end grow items-center">
        {(
          <AddToListButton
            artwork={currentArtwork}
            selectedMuseum={recordDetails.gallery}
            needsConfirm={true}
          />
        )}
        {(
          <AddToExhibitButton
            artwork={currentArtwork}
            selectedMuseum={recordDetails.gallery}
            needsConfirm={true}
          />
        )}
      </div>
        <br />
        <div className="flex justify-center place-items-end grow">
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
