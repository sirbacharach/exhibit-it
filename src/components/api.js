import axios from "axios";

const clevelandApi = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api",
});

const chicagoApi = axios.create({
  baseURL: "https://api.harvardartmuseums.org",
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
    .get(`/object?hasimage=true&size=30&page=1&apikey=placeholder_key`)
    .then((response) => {
      console.log(response.data)
      return [response.data.records, response.data.info.totalrecords];
    });
};

// GET SINGLE ChicagoArtwork
const getSingleChicagoArtwork = (chicagoartwork_id) => {
  console.log(chicagoartwork_id);
  console.log(`/artworks/${chicagoartwork_id}`);
  return chicagoApi.get(`/artworks/${chicagoartwork_id}`).then((response) => {
    console.log("single artwork response, Chicago", response.data.data);
    return response.data.data;
  });
};

export { getAllClArtworks, getSingleClArtwork, getAllChicagoArtworks, getSingleChicagoArtwork };
