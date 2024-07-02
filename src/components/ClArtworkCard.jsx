import { Link } from "react-router-dom";

const ClArtworkCard = ({ clArtwork }) => {
  return (
    
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl">
      {clArtwork?.images?.web?.url? <img
        className="w-auto"
        src={clArtwork.images.web.url}
        alt={`painting of "${clArtwork.title}"`}
      /> : null}
      <h1>{clArtwork.title}</h1>
      {/* {/* <p>Id: {clArtwork.athena_id}</p> */}
      <p>Creation Date: {clArtwork.creation_date}</p>
      <p>Culture: {clArtwork.culture}</p>
      <p>Type: {clArtwork.type}</p>
      <p>Technique: {clArtwork.technique}</p>
    </li>
    
  );
};

export default ClArtworkCard;
