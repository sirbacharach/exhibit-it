import { Link } from "react-router-dom";
import { ListContext } from "./ListContext";
import { useContext, useEffect } from "react";
import AddToListButton from "./AddToListButton";

const ClArtworkCard = ({ clArtwork, selectedMuseum }) => {

  const { tempList, setTempList} = useContext(ListContext);

  useEffect(() => {
    console.log(tempList)
  }, [tempList]);

  return (
    <li className="inner-container-colour article-card min-w-72 max-w-72 m-2 list-none content-between bg-titletextbackground p-3 drop-shadow-md rounded-xl flex flex-col">
      <Link
        to={`/clartworks/${clArtwork.accession_number}`}
        className="all-articles light-font-colour"
        style={{ textDecoration: "none" }}
      >
        {clArtwork?.images?.web?.url ? (
          <img
            className="w-auto"
            src={clArtwork.images.web.url}
            alt={`painting of "${clArtwork.title}"`}
          />
        ) : null}
        <h1>{clArtwork?.title ? clArtwork.title : "no title available"}</h1>
        {/* {/* <p>Id: {clArtwork.athena_id}</p> */}
        <p>Creation Date: {clArtwork.creation_date}</p>
        <p>Culture: {clArtwork.culture}</p>
        <p>Type: {clArtwork.type}</p>
        <p>Technique: {clArtwork.technique}</p>
        <br></br>
      </Link>
      <div className="flex justify-center place-items-end grow">
      <AddToListButton clArtwork={clArtwork} tempList={tempList} setTempList={setTempList} selectedMuseum={selectedMuseum}/>
    </div>
    </li>
  );
};

export default ClArtworkCard;
