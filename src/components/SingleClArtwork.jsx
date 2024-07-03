import { useContext, useEffect, useState } from "react";
import { getSingleClArtwork} from "./api";
import AddToListButton from "./AddToListButton";
import { ListContext } from "./ListContext";
import { useParams } from "react-router-dom";

// import Error from "./Error";

const SingleClArtwork = () => {

  const { tempList, setTempList} = useContext(ListContext);

  const [clArtwork, setClArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { clartwork_id } = useParams();
  const [apiError, setApiError] = useState("");

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
  }, []);

  const handleGoBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  if (isLoading) {
    return <p id="status-msg">Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="relative flex flex-col max-w-4xl mx-auto pb-10 pt-5">
        {clArtwork?.images?.web?.url ? (
          <img
            className="w-full"
            src={clArtwork.images.web.url}
            alt={`painting of "${clArtwork.title}"`}
            loading="lazy"
          />
        ) : null}
        <br></br>
        <h1>Title: {clArtwork?.title ? clArtwork.title : "no title available"}</h1>
        <p>Id: {clArtwork.athena_id}</p>
        <p>Creation Date: {clArtwork.creation_date}</p>
        <p>Culture: {clArtwork.culture}</p>
        <p>Type: {clArtwork.type}</p>
        <p>Technique: {clArtwork.technique}</p>
        <br></br>
        <p>{clArtwork.description}</p>
        <br></br>
        <div className="flex justify-center place-items-end grow">
        <AddToListButton clArtwork={clArtwork} tempList={tempList} setTempList={setTempList} selectedMuseum={"Cleveland"}/>
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg bg-titlebackground text-center">
          <button onClick={handleGoBack}>Go Back</button>
      </div>
        </div>
    </div>
      </div>
    </>
  );
};

export default SingleClArtwork;
