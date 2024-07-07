import axios from "axios";

const clevelandApi = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api",
});

const chicagoApi = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
});

// &limit=${itemLimit}&skip=${skip}
// GET ALL ClArtworks
const getAllClArtworks = (page, itemLimit, type, department) => {
  const skip = itemLimit * page;
  let typeStr = ""
  let departmentStr = ""
  if (department) departmentStr = `&department=${department}`
    if (type) typeStr = `&type=${type}`
  return clevelandApi
    .get(`/artworks?has_image=1${typeStr}${departmentStr}&page=2&limit=${itemLimit}&skip=${skip}`)
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

// GET ALL ChicagoArtworks
const getAllChicagoArtworks = (page, itemLimit, type, department) => {
  const skip = itemLimit * page;
  let typeStr = ""
  let departmentStr = ""

  return chicagoApi
    .get(`/artworks?page=${page+1}&limit=${itemLimit}`)
    .then((response) => {
      console.log("all artworks response, Chicago", response.data.data)
      return [response.data.data, response.data.pagination.total];
    });
};

// GET SINGLE ChicagoArtwork
const getSingleChicagoArtwork = (chicagoArtwork_id) => {
  console.log(chicagoArtwork_id);
  console.log(`/artworks/${clartwork_id}`);
  return chicagoApi.get(`/artworks/${clartwork_id}`).then((response) => {
    console.log("single artwork response, Chicago", response.data.data);
    return response.data.data;
  });
};

export { getAllClArtworks, getSingleClArtwork, getAllChicagoArtworks, getSingleChicagoArtwork };
