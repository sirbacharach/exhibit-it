import axios from "axios";

const api = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api",
});

// GET ALL ClArtworks
const getAllClArtworks = (page) => {
  const skip = 10 * page;

  return api
    .get(`/artworks?skip=${skip}&limit=10&has_image=1`)
    .then((response) => {
      console.log("Getting All Cleveland Works");
      console.log(response);
      return [response.data.data, response.data.info.total];
    });
};

// GET SINGLE ClArtwork
const getSingleClArtwork = (clartwork_id) => {
  console.log(clartwork_id);
  console.log(`/artworks/${clartwork_id}`);
  return api.get(`/artworks/${clartwork_id}`).then((response) => {
    console.log(response.data.data);
    return response.data.data;
  });
};

// GET ALL ChicagoArtworks
const getAllChicagoArtworks = (page) => {
  const skip = 10 * page;

  return api
    .get(`/artworks?skip=${skip}&limit=10&has_image=1`)
    .then((response) => {
      console.log("Getting All Chicago Works");
      console.log(response);
      return [response.data.data, response.data.info.total];
    });
};

// GET SINGLE ChicagoArtwork
const getSingleChicagoArtwork = (clartwork_id) => {
  console.log(clartwork_id);
  console.log(`/artworks/${clartwork_id}`);
  return api.get(`/artworks/${clartwork_id}`).then((response) => {
    console.log(response.data.data);
    return response.data.data;
  });
};

export { getAllClArtworks, getSingleClArtwork, getAllChicagoArtworks, getSingleChicagoArtwork };
