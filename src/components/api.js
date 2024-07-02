import axios from "axios";

const api = axios.create({ baseURL: "https://openaccess-api.clevelandart.org/api" });

// GET ALL ClArtworks
const getAllClArtworks = (page) => {
  const skip = 10*page

  return api.get(`/artworks?skip=${skip}&limit=10&has_image=1`).then((response) => {
      console.log(response)
    return [response.data.data, response.data.info.total]
  });
};

// GET SINGLE ClArtwork
const getSingleClArtwork = (article_id) => {
  return api.get(`/api/articles/${article_id}`).then((response) => {
    return response.data;
  });
};


export {
  getAllClArtworks,
  getSingleClArtwork,

};
