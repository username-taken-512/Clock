// Unsplash API - https://unsplash.com/documentation#search-photos
const API_KEY = 'bbh3wGo3r9CFrYc8Gq8IcmR46hWwBqeqaMNzWBs9vC4';
const searchURL = 'https://api.unsplash.com/search/photos/?client_id=' + API_KEY + '&query=' // Append search term


// Displays loaded images on page
async function displayImages(city) {
  let imageElement = document.getElementById('mainpic');
  let images = await getImages(city);

  console.log('display Image: ' + images);
  imageElement.src = images[0].urls.regular;
}

// Returns a list of image URL's on search term
async function getImages(searchTerm) {
  return fetch(searchURL + searchTerm)
    .then((response) => response.json())
    .then((data) => {
      let allImages = data.results;
      console.log(allImages[0]);
      console.log(allImages[0].urls.regular);
      return allImages;
    });
}
