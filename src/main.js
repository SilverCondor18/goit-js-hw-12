import searchImages from "./js/pixabay-api";
import renderGallery from "./js/render-functions";
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt" });

const errMsg = msg => {
    iziToast.error({
        title: "",
        message: msg,
        position: "topRight"
    });
};

const currentQuery = {
    query: "",
    page: 1,
    totalHits: 0
};

const formSubmitHandler = async event => {
    event.preventDefault();
    const query = searchForm.query.value;
    currentQuery.query = query.trim();
    currentQuery.page = 1;
    gallery.innerHTML = "";
    loader.classList.remove("el-hidden");
    loadMore.classList.add("el-hidden");
    try {
        if (currentQuery.query == "")
        {
            throw new Error("Search query input cannot be empty.");
        }
        const queryResult = await searchImages(query, 1);
        const galleryItems = renderGallery(queryResult.data);
        currentQuery.totalHits = queryResult.data.totalHits;
        if (galleryItems.length > 0) {
            gallery.innerHTML = galleryItems.join('');
            lightbox.refresh();
            if (currentQuery.totalHits > 15)
            {
                loadMore.classList.remove("el-hidden");
            }
        }
        else {
            throw new Error("Sorry, there are no images matching your search query. Please try again!");
        }
    }
    catch (err)
    {
        errMsg(err.message);
    }
    finally
    {
        loader.classList.add("el-hidden");
    }
};

const loadMoreClickHandler = async event => {
    try
    {
        loadMore.classList.add("el-hidden");
        loader.classList.remove("el-hidden");
        const queryResult = await searchImages(currentQuery.query, ++currentQuery.page);
        const galleryItems = renderGallery(queryResult.data);
        if (galleryItems.length > 0)
        {
            const scrollHeight = gallery.lastChild.getBoundingClientRect().height * 2;
            gallery.insertAdjacentHTML("beforeend", galleryItems.join(''));
            window.scrollBy({
                top: scrollHeight,
                left: 0,
                behavior: "smooth"
            });
            lightbox.refresh();
            if (galleryItems.length < 15)
            {
                errMsg("We're sorry, but you've reached the end of search results.");
            }
            else
            {
                loadMore.classList.remove("el-hidden");
            }
        }
        else
        {
            throw new Error("We're sorry, but you've reached the end of search results.");
        }
    }
    catch (err)
    {
        errMsg(err.message);
    }
    finally
    {
        loader.classList.add("el-hidden");
    }
};

searchForm.addEventListener("submit", formSubmitHandler);
loadMore.addEventListener("click", loadMoreClickHandler);