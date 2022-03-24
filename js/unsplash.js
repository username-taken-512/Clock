// Unsplash API - https://unsplash.com/documentation#search-photos
const API_KEY = 'bbh3wGo3r9CFrYc8Gq8IcmR46hWwBqeqaMNzWBs9vC4';
const searchURL = 'https://api.unsplash.com/search/photos/?client_id=' + API_KEY + '&query=' // Append search term


// Displays loaded images on page
async function displayImages(imageElement, ...searchTerms) {

  // Looking for image (1 second between unsplash API calls)
  for (searchTerm of searchTerms) {
    let images = await getImages(searchTerm);
    if (images.length > 0) {
      console.log(images);
      imageElement.src = images[0].urls.regular;
      imageElement.title = images[0].description || searchTerm;
      return;
    } else {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  imageElement.src = './images/no-image-found.jpg';
}

// Returns a list of image URL's on search term
async function getImages(searchTerm) {
  return fetch(searchURL + searchTerm)
    .then((response) => response.json())
    .then((data) => {
      let allImages = data.results;
      return allImages;
    });
}
