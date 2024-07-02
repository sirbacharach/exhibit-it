import axios from "axios";

const api = axios.create({ baseURL: "https://openaccess-api.clevelandart.org/" });

// GET ALL ClArtworks
const getAllClArtworks = (topic, sort_by = "created_at", order = "ASC") => {
  return api.get(`/api/artworks/?limit=10`,
    {params: {
      "topic": topic,
      "sort_by": sort_by,
      "order": order
    }}).then((response) => {

    return response.data.articles;
  });
};

// GET SINGLE ClArtwork
const getSingleClArtwork = (article_id) => {
  return api.get(`/api/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};


export {
  getAllClArtworks,
  getSingleClArtwork,

};
