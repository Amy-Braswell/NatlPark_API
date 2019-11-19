

'use strict';

const apiKey = 'KFzjIXeflsLaqnKagKQ3wT4KeZPhpIkD3HaFaaKn'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParksByState(query, limit=10, api_key) {
  const params = {
    stateCode: query,
    limit,
    api_key: apiKey
  };


    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
  
    fetch(url)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}


function displayResults(responseJson) {
    // if there are previous results, remove them
    $('#results-list').empty();

    //iterate through the articles array, stopping at the end of the repo list
    for (let i = 0; i < responseJson.data.length ; i++){
      // add a list item to the results list for each repo in the response array,
      // list with the repo title and link to the repo
        $('#results-list').append(
          `<li>
              <h3>${responseJson.data[i].fullName}</h3><p>${responseJson.data[i].description}</br><a href="${responseJson.data[i].url}" target="#">${responseJson.data[i].url}</a></p>
          </li>`
        )};
    
    //display the results section  
    $('#results').removeClass('hidden');
};


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-state').val();
    const maxResults = $('#js-max-results').val();
    getParksByState(searchState, maxResults);
  });
}

$(watchForm);