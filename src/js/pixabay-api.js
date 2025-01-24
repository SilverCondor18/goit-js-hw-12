import axios from "axios";

const apiParams = {
    key: "48326966-0a5fa166f497e375098be0f90",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 15
};

export const searchImages = (query, pageNumber) => {
    return axios.get("https://pixabay.com/api/", {
        params: {
            ...apiParams,
            q: query,
            page: pageNumber
        }
    });
};

export default searchImages;