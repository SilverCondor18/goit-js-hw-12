export const renderGallery = data => {
    return data.hits.map(img => {
        return `<li class='gallery-item'>
            <a href='${img.largeImageURL}'><img class='gallery-img' src='${img.webformatURL}' alt='${img.tags}'></a>
            <ul class='user-activity'>
                <li class='user-activity-item'><span class='user-activity-header'>Likes</span>${img.likes}</li>
                <li class='user-activity-item'><span class='user-activity-header'>Views</span>${img.views}</li>
                <li class='user-activity-item'><span class='user-activity-header'>Comments</span>${img.comments}</li>
                <li class='user-activity-item'><span class='user-activity-header'>Downloads</span>${img.downloads}</li>
            </ul>
        </li>`;
    });
};

export default renderGallery;