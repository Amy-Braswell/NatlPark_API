// GET "https://developer.nps.gov/api/v1/parks?stateCode=IL"

https://www.nps.gov/subjects/developer/api-documentation.htm#/parks/getPark

// api Auth Header:
//curl -H 'X-Api-Key: INSERT-API-KEY-HERE' 'https://developer.nps.gov/api/v1/parks?parkCode=acad'

// data.fullName
// data.description
// url


'use strict';


const apiKey = 'KFzjIXeflsLaqnKagKQ3wT4KeZPhpIkD3HaFaaKn'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParksByState(query, maxResults=10) {
  const params = {
    q: query,
    maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);

  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParksByState(searchState, maxResults);
  });
}

$(watchForm);