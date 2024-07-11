import axios from "axios";

const clevelandApi = axios.create({
  baseURL: "https://api.harvardartmuseums.org",
});

const chicagoApi = axios.create({
  baseURL: "https://www.rijksmuseum.nl/api/nl",
});

// &limit=${itemLimit}&skip=${skip}
// GET ALL ClArtworks
const getAllClArtworks = async (page, itemLimit, type, department) => {
  const skip = itemLimit * page;
  let typeStr = "";
  let departmentStr = "";
  if (department) departmentStr = `&department=${department}`;
  if (type) typeStr = `&type=${type}`;

  try {
    const response = await clevelandApi.get(
      `/object?apikey=placeholder_key&hasimage=1&sort=id&size=${itemLimit}&page=${page+1}`
    );
    console.log("this is what you get", response.data)
    return [response.data.records, response.data.info.totalrecords];
  } catch (error) {
    console.error("Error fetching Cleveland artworks:", error);
    throw error;
  }
};

// GET SINGLE ClArtwork
const getSingleClArtwork = async (clartwork_id) => {
  try {
    const response = await clevelandApi.get(`/artworks/${clartwork_id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching Cleveland artwork ${clartwork_id}:`, error);
    throw error;
  }
};

const getAllChicagoArtworks = async (
  pageNo,
  itemLimit,
  selectedType,
  selectedDepartment,
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
  let materialString = material ? `&material=${material.split(" ").join("+")}` : "";
  let techniqueString = technique ? `&technique=${technique.split(" ").join("+")}` : "";

  try {
    const response = await chicagoApi.get(
      `/collection?key=25T7NCOQ&imgonly=true&ps=${itemLimit}&p=${pageNo + 1}&culture=en${sort}${makerString}${typeString}${periodString}${placeString}${materialString}${techniqueString}`
    );

    const artObjects = response.data.artObjects;
    console.log(artObjects)
    const promises = artObjects.map((artwork) =>
      getSingleChicagoArtwork(artwork.objectNumber)
    );

    const singleArtworks = await Promise.all(promises);
    console.log(singleArtworks)
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
      `/collection/${chicagoartwork_id}?key=25T7NCOQ&culture=en`
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
  getAllClArtworks,
  getSingleClArtwork,
  getAllChicagoArtworks,
  getSingleChicagoArtwork,
  getChicagoFacets,
};
