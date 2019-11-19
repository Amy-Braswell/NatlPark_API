


// api Auth Header:
//curl -H 'X-Api-Key: KFzjIXeflsLaqnKagKQ3wT4KeZPhpIkD3HaFaaKn' 'https://developer.nps.gov/api/v1/parks'

// RETURN
// data.fullName
// data.description
// data.url


'use strict';

// right now apiKey is built into url - put in header eventually
const apiKey = 'KFzjIXeflsLaqnKagKQ3wT4KeZPhpIkD3HaFaaKn'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParksByState(query, maxResults=10, api_key,) {
  const params = {
    stateCode: query,
    maxResults,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log({url, params});  // self-commenting "url: url params: param"

  /*
  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };
  */
  
  fetch(url)
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
    console.log("watchForm ran");
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParksByState(searchState, maxResults);
    console.log({searchState});
    console.log({maxResults});
  });
}



$(watchForm);