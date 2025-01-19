const apiParams = {
    key: "48326966-0a5fa166f497e375098be0f90",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true"
};

export const searchImages = query => {
    const searchParams = new URLSearchParams({...apiParams, q: query});
    return fetch(`https://pixabay.com/api/?${searchParams}`);
};

export default searchImages;