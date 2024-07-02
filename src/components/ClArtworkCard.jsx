import { Link } from "react-router-dom";

const ClArtworkCard = ({ article }) => {
  return (
    <li className="inner-container-colour article-card">

      <Link
        // to={`/clartworks/${clArtwork.clArtwork_id}`}
        // className="all-artwork light-font-colour"
        // style={{ textDecoration: "none" }}
      >
        {/* <h2 id="clArtwork-title">{clArtwork.title}</h2>
        <p className="clArtwork-text-gap">Author: {clArtwork.author}</p>
        <p className="clArtwork-text-gap">Topic: {clArtwork.topic}</p>
        <p className="clArtwork-text-gap">Created: {clArtwork.created_at.slice(0, 10)}</p> */}

        <img
          // id="all-clArtwork-imgs"
          // src={clArtwork.clArtwork}
          // alt={`the artwork "${clArtwork.title}"`}
        />
      </Link>
    </li>
  );

};

export default ClArtworkCard;
