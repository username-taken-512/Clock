// Delegated event handling
// - Listen to clicks on the body
// - Only react if you clicked an a tag

document.querySelector('body')
  .addEventListener('click', function (event) {
    // event.target - the innermost HTML element clicked
    let aTag = event.target.closest('a');

    // Do nothing is not a link
    if (!aTag) { return; }

    // Check if external link & open in new window
    let href = aTag.getAttribute('href');

    /*
    // Get Params
    if (href.includes('?')) {
      let paramsString = href.substring(href.indexOf('?') + 1);
      let searchParams = new URLSearchParams(paramsString);
      console.log('href: ' + href);
      console.log(searchParams.get('city'));

      //Iterate the search parameters.
      for (let p of searchParams) {
        console.log(p);
      }
    }
    */


    /*
    let city = aTag.getAttribute('data-city');

    console.log('href: ' + href);
    console.log('city: ' + city);
    */


    if (href.indexOf('http') === 0) {
      aTag.setAttribute('target', '_blank');
      return;
    }

    //If internal link, prevent default browser behavior (reload)
    event.preventDefault();

    // Use HTML5 history and push a new state for back button behavior
    history.pushState(null, null, href);

    // Call router
    router();
  });

// Run router on back/forward
window.addEventListener('popstate', router);

// Run router on page load
router();

// Router for SPA
async function router() {
  console.log('- Router pathname: ' + location.pathname);
  let url = document.URL;
  let route = location.pathname;
  let searchParams;

  // Get Params
  if (url.includes('?')) {
    let paramsString = url.substring(url.indexOf('?') + 1);
    searchParams = new URLSearchParams(paramsString);
    console.log('url: ' + url);
    console.log(searchParams.get('city'));

    // TEST Iterate the search parameters
    for (let p of searchParams) {
      console.log(p);
    }
  }


  makeNavActive(route); // Show Navigation active

  // Transform route to a partial
  route = route === '/' ? '/start' : route;
  route = '/partials' + route + '.html';
  console.log("Navigate: ", route);

  // Load text from partial & replace content in main element
  let content = await (await fetch(route)).text();
  document.querySelector('main').innerHTML = content;

  // if (route.startsWith('/partials/timezones.html?q=')) {
  //   let splitUrl = route.split('=');
  //   let searchTerm = splitUrl[1];
  //   console.log('Searched for: ' + searchTerm);
  // }

  // Run productLister function (another file) if on products page
  if (route === '/partials/timezones.html') {
    setupTimezonePage();
    //loadJsonDisplayTimezones();
  } else if (route === '/partials/timezonedetails.html') {
    drawDetails(searchParams);
  }
  // route === '/partials/timezones.html' && loadJsonDisplayProducts();
}

function makeNavActive(route) {
  // Show Navigation active
  let aTagsInNav = document.querySelectorAll('nav a');
  for (let aTag of aTagsInNav) {
    aTag.classList.remove('active');
    let href = aTag.getAttribute('href');
    if (href === route) {
      aTag.classList.add('active');
    }
  }
}