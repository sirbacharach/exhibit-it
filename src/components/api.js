import axios from "axios";

const vAndAApi = axios.create({
  baseURL: "https://api.vam.ac.uk/v2",
});

const chicagoApi = axios.create({
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
  let searchStr = "";
  let materialStr = "";
  let placeStr = "";
  let personStr = "";
  let orderBy = "";
  let orderSort = "";
  if (sortCriteria) {
    orderBy = `&order_by=${sortCriteria}`;
    orderSort = `&order_sort=${sortOrder}`;
  }
  if (sortOrder) orderSort = `&order_sort=${sortOrder}`;

  if (selectedMaterial)
    materialStr = `&q_material_technique=${selectedMaterial}`;
  if (selectedPlace) placeStr = `&q_place_name=${selectedPlace}`;
  if (selectedPerson) personStr = `&q_place_name=${selectedPerson}`;
  if (userSearch) searchStr = `&kw_object_type=${userSearch}`;

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

const getAllChicagoArtworks = async (
  pageNo,
  itemLimit,
  sortCriteria,
  sortOrder,
  principalMaker,
  type,
  datingPeriod,
  place,
  material,
  technique
) => {
  let sort = "";
  if (sortCriteria === "relevance") {
    sort = "&s=relevance";
  } else if (sortCriteria === "objecttype") {
    sort = "&s=objecttype";
  } else if (sortCriteria === "chronologic") {
    if (sortOrder === "ascending") {
      sort = "&s=chronologic";
    } else {
      sort = "&s=achronologic";
    }
  } else if (sortCriteria === "artist") {
    if (sortOrder === "ascending") {
      sort = "&s=artist";
    } else {
      sort = "&s=artistdesc";
    }
  }

  let makerString = principalMaker
    ? `&involvedMaker=${principalMaker.split(" ").join("+")}`
    : "";
  let typeString = type ? `&type=${type.split(" ").join("+")}` : "";
  let periodString = datingPeriod ? `&f.dating.period=${datingPeriod}` : "";
  let placeString = place ? `&place=${place.split(" ").join("+")}` : "";
  let materialString = material
    ? `&material=${material.split(" ").join("+")}`
    : "";
  let techniqueString = technique
    ? `&technique=${technique.split(" ").join("+")}`
    : "";

  try {
    const response = await chicagoApi.get(
      `/collection?key=25T7NCOQ&imgonly=true&ps=${itemLimit}&p=${
        pageNo + 1
      }&culture=en${sort}${makerString}${typeString}${periodString}${placeString}${materialString}${techniqueString}`
    );
    const artObjects = response.data.artObjects;
    const promises = artObjects.map((artwork) =>
      getSingleChicagoArtwork(artwork.objectNumber)
    );

    const singleArtworks = await Promise.all(promises);
    return [singleArtworks, response.data.count];
  } catch (error) {
    console.error("Error fetching Chicago artworks:", error);
    throw error;
  }
};

// GET SINGLE ChicagoArtwork
const getSingleChicagoArtwork = async (chicagoartwork_id) => {
  try {
    const response = await chicagoApi.get(
      `/collection/${chicagoartwork_id}?key=25T7NCOQ`
    );
    return response.data.artObject;
  } catch (error) {
    console.error(
      `Error fetching Chicago artwork ${chicagoartwork_id}:`,
      error
    );
    throw error;
  }
};

// GET Chicago facets.
const getChicagoFacets = async () => {
  try {
    const response = await chicagoApi.get(
      `https://www.rijksmuseum.nl/api/nl/collection?key=25T7NCOQ&ps1&p=1`
    );
    return response.data.facets;
  } catch (error) {
    console.error("Error fetching Chicago facets:", error);
    throw error;
  }
};

export {
  getAllVAndAArtworks,
  getSingleVAndAArtwork,
  getAllChicagoArtworks,
  getSingleChicagoArtwork,
  getChicagoFacets,
};
