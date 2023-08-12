import axios from "axios";

const BAZE_URL = 'https://pixabay.com/api/';


async function getPhotosService(value, page) {

  const { data } = await axios(BAZE_URL, {
    params: {
      key: '38700636-ea33df46ee2c91044811eb016',
      q: `${value}`,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      page: page,
      per_page: 40,
    }
  });
  return data;
}

export { getPhotosService };