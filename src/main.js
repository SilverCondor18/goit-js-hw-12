import searchImages from "./js/pixabay-api";
import renderGallery from "./js/render-functions";
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

const lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt" });

const errMsg = msg => {
    iziToast.error({
        title: "",
        message: msg,
        position: "topRight"
    });
};

const formSubmitHandler = event => {
    event.preventDefault();
    const query = searchForm.query.value;
    gallery.innerHTML = "";
    loader.classList.remove("hidden-loader");
    const queryResult = searchImages(query);
    queryResult
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => renderGallery(data))
        .then(galleryItems => {
            if (galleryItems.length > 0) {
                gallery.innerHTML = galleryItems.join('');
                lightbox.refresh();
            }
            else
            {
                throw new Error("Sorry, there are no images matching your search query. Please try again!");
            }
        })
        .catch(err => errMsg(err.message))
        .finally(() => loader.classList.add("hidden-loader"));
};

searchForm.addEventListener("submit", formSubmitHandler);