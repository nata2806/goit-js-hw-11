import axios from "axios";

const BAZE_URL = 'https://pixabay.com/api/'

const getPhotosService = async (value, page) => {

    const { data } = await axios(BAZE_URL, {
        params: {
            key: '38614458-d50fcc5469c58311283d9e834',
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