import axios from "axios";

const vAndAApi = axios.create({
  baseURL: "https://api.vam.ac.uk/v2",
});

const RijkApi = axios.create({
  baseURL: "https://www.rijksmuseum.nl/api/nl",
});

// GET ALL VAndAArtworks
const getAllVAndAArtworks = async (
  pageNo,
  itemLimit,
  selectedMaterial,
  selectedPlace,
  selectedPerson,
  userSearch,
  sortCriteria,
  sortOrder,
  principalMaker,
  type,
  datingPeriod,
  technique
) => {
  const skip = itemLimit * pageNo;
  let searchStr = userSearch ? `&kw_object_type=${userSearch}` : "";
  let materialStr = selectedMaterial
    ? `&q_material_technique=${selectedMaterial}`
    : "";
  let placeStr = selectedPlace ? `&q_place_name=${selectedPlace}` : "";
  let personStr = selectedPerson ? `&q_place_name=${selectedPerson}` : "";
  let orderBy = sortCriteria ? `&order_by=${sortCriteria}` : "";
  let orderSort = sortOrder ? `&order_sort=${sortOrder}` : "";

  try {
    const response = await vAndAApi.get(
      `/objects/search?page_size=10&images=1&page_size=${itemLimit}&page=${
        pageNo + 1
      }${orderBy}${orderSort}${materialStr}${placeStr}${personStr}${searchStr}`
    );
    return [response.data.records, response.data.info.record_count];
  } catch (error) {
    console.error("Error fetching Victoria and Albert artworks:", error);
    throw error;
  }
};

// GET SINGLE VAndAArtwork
const getSingleVAndAArtwork = async (artworkId) => {
  try {
    const response = await vAndAApi.get(`/museumobject/${artworkId}`);

    return response.data.record;
  } catch (error) {
    console.error(
      `Error fetching Victoria and Albert artwork ${artworkId}:`,
      error
    );
    throw error;
  }
};

const getAllRijkArtworks = async (
  pageNo,
  itemLimit,
  selectedMaterial,
  selectedPlace,
  selectedPerson,
  userSearch,
  sortCriteria,
  sortOrder,
  principalMaker,
  type,
  datingPeriod,
  technique
) => {
  
  // Deals with sorting
  const sortMap = {
    chronologic: sortOrder === "asc" ? "&s=chronologic" : "&s=achronologic",
    artist: sortOrder === "asc" ? "&s=artist" : "&s=artistdesc",
  };
  let sort = sortMap[sortCriteria] || "";

  let makerString = principalMaker
    ? `&involvedMaker=${principalMaker.split(" ").join("+")}`
    : "";
  let typeString = type ? `&type=${type.split(" ").join("+")}` : "";
  let periodString = datingPeriod ? `&f.dating.period=${datingPeriod}` : "";
  let placeString = selectedPlace
    ? `&place=${selectedPlace.split(" ").join("+")}`
    : "";
  let materialString = selectedMaterial
    ? `&material=${selectedMaterial.split(" ").join("+")}`
    : "";
  let techniqueString = technique
    ? `&technique=${technique.split(" ").join("+")}`
    : "";
  let searchString = userSearch ? `&q=${userSearch}` : ""; // Add missing semicolon here

  try {
    const response = await RijkApi.get(
      `/collection?key=25T7NCOQ&imgonly=true&ps=${itemLimit}&p=${
        pageNo + 1
      }&culture=en${sort}${makerString}${typeString}${periodString}${placeString}${materialString}${techniqueString}${searchString}`
    );
    return [response.data.artObjects, response.data.count];
  } catch (error) {
    console.error("Error fetching Rijk artworks:", error);
    throw error;
  }
};


// GET SINGLE RijkArtwork
const getSingleRijkArtwork = async (rijkartwork_id) => {
  console.log(rijkartwork_id)
  try {
    const response = await RijkApi.get(
      `/collection/${rijkartwork_id}?key=25T7NCOQ`
    );
    console.log(response.data)
    return response.data.artObject;
  } catch (error) {
    console.error(
      `Error fetching Rijk artwork ${rijkartwork_id}:`,
      error
    );
    throw error;
  }
};

// GET Rijk facets.
const getRijkFacets = async () => {
  try {
    const response = await RijkApi.get(
      `https://www.rijksmuseum.nl/api/nl/collection?key=25T7NCOQ&ps1&p=1`
    );
    return response.data.facets;
  } catch (error) {
    console.error("Error fetching Rijk facets:", error);
    throw error;
  }
};

export {
  getAllVAndAArtworks,
  getSingleVAndAArtwork,
  getAllRijkArtworks,
  getSingleRijkArtwork,
  getRijkFacets,
};
