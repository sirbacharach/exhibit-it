import axios from "axios";

const clevelandApi = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api",
});

const chicagoApi = axios.create({
  baseURL: "https://www.rijksmuseum.nl/api/nl",
});

// &limit=${itemLimit}&skip=${skip}
// GET ALL ClArtworks
const getAllClArtworks = (page, itemLimit, type, department) => {
  const skip = itemLimit * page;
  let typeStr = "";
  let departmentStr = "";
  if (department) departmentStr = `&department=${department}`;
  if (type) typeStr = `&type=${type}`;
  return clevelandApi
    .get(
      `/artworks?has_image=1${typeStr}${departmentStr}&page=2&limit=${itemLimit}&skip=${skip}`
    )
    .then((response) => {
      // console.log(response.data.data)
      return [response.data.data, response.data.info.total];
    });
};

// GET SINGLE ClArtwork
const getSingleClArtwork = (clartwork_id) => {
  return clevelandApi.get(`/artworks/${clartwork_id}`).then((response) => {
    return response.data.data;
  });
};

const getAllChicagoArtworks = ( pageNo, itemLimit, selectedType, selectedDepartment, sortCriteria, sortOrder ) => {
  
  let sort=""
  if(sortCriteria === "relevance")
    {sort = "&s=relevance"}
  else if (sortCriteria === "objecttype") {
    sort = "&s=objecttype"
  } else if (sortCriteria === "chronologic") {
    if (sortOrder === "ascending") {
      sort = "&s=chronologic"
    } else { sort = "&s=achronologic"}
  } else if (sortCriteria === "artist") {
    if (sortOrder === "ascending") {
      sort = "&s=artist"
    } else { sort = "&s=artistdesc"}
  }

  return chicagoApi
    .get(`/collection?key=25T7NCOQ&imgonly=true&ps=${itemLimit}&p=${pageNo + 1}&culture=en${sort}`)
    .then((response) => {
      console.log (response)
      const artObjects = response.data.artObjects;
      const promises = artObjects.map((artwork) => {
        return getSingleChicagoArtwork(artwork.objectNumber);
      });

      return Promise.all(promises)
        .then((singleArtworks) => {
          return [singleArtworks, response.data.count];
        })
        .catch((error) => {
          console.error("Error fetching single artworks:", error);
          throw error;
        });
    })
    .catch((error) => {
      console.error("Error fetching Chicago artworks:", error);
      throw error;
    });
};

// GET SINGLE ChicagoArtwork
const getSingleChicagoArtwork = (chicagoartwork_id) => {
  return chicagoApi
    .get(`/collection/${chicagoartwork_id}?key=25T7NCOQ&culture=en`)
    .then((response) => {
      return response.data.artObject;
    })
    .catch((error) => {
      console.error(
        `Error fetching Chicago artwork ${chicagoartwork_id}:`,
        error
      );
      throw error;
    });
};

export {
  getAllClArtworks,
  getSingleClArtwork,
  getAllChicagoArtworks,
  getSingleChicagoArtwork,
};
