import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleClArtwork } from "./api";
import Error from "./Error";

const SingleClArtwork = () => {
  const [clArtwork, setClArtwork] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { clArtwork_id } = useParams();
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    getSingleClArtwork(clArtwork_id)
      .then((response) => {
        setClArtwork(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setApiError(err);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p id="status-msg">Content Loading....</p>;
  } else if (apiError) {
    return <Error message={apiError.message} />;
  }

  return (
    <>
      <div className="single-item inner-container-colour light-font-colour">
        <h2 id="clArtwork-title">{clArtwork.title}</h2>
        <img
          id="all-clArtwork-imgs"
          src={clArtwork.clArtwork}
          alt={`${clArtwork.title}`}
        />
        <p>{clArtwork.created_at ? clArtwork.created_at.slice(0, 10) : <></>}</p>
        <p>{clArtwork.author}</p>
        <p>{clArtwork.body}</p>
        <p>Topic: {clArtwork.topic}</p>
        <p>Votes: {clArtwork.votes}</p>
        <button className="vote-button" onClick={DownVote}>
          Down Vote
        </button>
        <button className="vote-button" onClick={UpVote}>
          Up Vote
        </button>
      </div>
    </>
  );
};

export default SingleClArtwork;
