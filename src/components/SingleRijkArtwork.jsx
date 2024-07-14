import { useContext, useEffect, useState } from "react";
import { getSingleRijkArtwork } from "./api";
import AddToListButton from "./AddToListButton";
import AddToExhibitButton from "./AddToExhibitButton";
import { ListContext } from "./ListContext";
import { useParams } from "react-router-dom";
import PlaceholderImage from "../assets/img/throbber.gif";
import Error from "./Error"; // Uncomment or import Error if not imported

const SingleRijkArtwork = () => {
  const { tempList, finalList } = useContext(ListContext);
  const [rijkArtwork, setRijkArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { rijkartwork_id } = useParams();
  const [apiError, setApiError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [recordDetails, setRecordDetails] = useState({
    artworkId: "",
    gallery: "",
  });

  useEffect(() => {
    console.log(rijkartwork_id)
    document.documentElement.lang = "nl"
    getSingleRijkArtwork(rijkartwork_id)
      .then((response) => {
        setRijkArtwork(response);
        setIsLoading(false);
        return response
      })
      .then((newArtwork) => {
        console.log(newArtwork)
        if (newArtwork) {
          const newRecordDetails = { artworkId: newArtwork.objectNumber || "placeholderId", gallery: newArtwork.objectNumber ? "Victoria and Albert Museum" : "Rijks Museum",
          };
          setRecordDetails(newRecordDetails);
        }
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, [rijkartwork_id, tempList]);

  const handleGoBack = () => {
    window.history.back();
  };

  const isInTempList =
    tempList &&
    Array.isArray(tempList) &&
    tempList.some((item) => item[0]?.artworkId === rijkartwork_id);

  const isInFinalList =
    finalList &&
    Array.isArray(finalList) &&
    finalList[1]?.some((item) => item[0]?.artworkId === rijkartwork_id);

  if (isLoading) {
    return <p>Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="relative flex flex-col max-w-4xl mx-auto pb-10 pt-5 mb-4">
        {rijkArtwork?.webImage?.url ? (
          <div className="flex justify-center items-center">
            <div>
              <img
                className={`w-auto ${isLoaded ? "block" : "hidden"} mb-4`}
                src={rijkArtwork.webImage.url}
                onLoad={() => setIsLoaded(true)}
                alt={rijkArtwork.title}
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
          {rijkArtwork?.title ? rijkArtwork.title : "no title available"}
        </h1>

        <p>Id: {rijkArtwork.objectNumber}</p>

        {rijkArtwork.dating?.presentingDate ? (
          <p>Creation Date: {rijkArtwork.dating.presentingDate}</p>
        ) : (
          <p>Creation Date: Unavailable</p>
        )}

        {rijkArtwork.principalOrFirstMaker ? (
          <p>Artist: {rijkArtwork.principalOrFirstMaker}</p>
        ) : (
          <p>Artist: Unavailable</p>
        )}

        {rijkArtwork.productionPlaces &&
        rijkArtwork.productionPlaces.length > 0 ? (
          <p>Culture: {rijkArtwork.productionPlaces[0]}</p>
        ) : (
          <p>Culture: Unavailable</p>
        )}

        {rijkArtwork.objectTypes ? (
          <p>Type: {rijkArtwork.objectTypes}</p>
        ) : (
          <p>Type: Unavailable</p>
        )}
        <p>Gallery Name: {recordDetails.gallery || Unavailable}</p>
        <br />
        {rijkArtwork.description ? (
          <p>Description: {rijkArtwork.description}</p>
        ) : (
          <p>Description: Unavailable</p>
        )}
        <br />
        <div className="flex justify-center place-items-end grow">
          <div className="flex flex-col justify-end place-items-end grow items-center">
            <div>
              <AddToListButton
                artwork={rijkArtwork}
                selectedMuseum={"Rijks Museum"}
                needsConfirm={true}
              />
            </div>
            {isInTempList || isInFinalList ? (
              <div>
                <AddToExhibitButton
                  artwork={rijkArtwork}
                  selectedMuseum={"Rijks Museum"}
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

export default SingleRijkArtwork;
