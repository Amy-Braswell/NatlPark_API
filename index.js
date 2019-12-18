

'use strict';

const apiKey = 'KFzjIXeflsLaqnKagKQ3wT4KeZPhpIkD3HaFaaKn'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';



function renderResult(result) {
  $('#results-list').append(
    `
      <button id="close-button" class="close hidden"><span>close</span><i class="fa fa-times"></i></button>
      <div class="returned-park">
          <h3>${result.fullName}</br></br> <span>State: ${result.states}</span></h3>
          <div class="text">
              <p>${result.description}</br></p>
              <p><a href="${result.url}" target="#" class="link">NPS Webpage</a></br></p>
              <p class="directions"><a href="${result.directionsUrl}" target="#" class="link">Directions to park</a></br></p>
          </div>
      </div> 
    `
  );
  $(".popup-overlay, .popup-content").addClass("active");
  $('.main').addClass('hidden');
  $('#close-button').removeClass('hidden');
  $('.confirm-submit').addClass('hidden');
  $('.something-wrong').addClass('hidden');
  $('#got-it').addClass('hidden');
}

$(".close, .popup-overlay").on("click", function(e) {
    if(!$(e.target).hasClass("link")) {
    closeResult();
    }
});


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  

function getParksByState(query, limit=50, api_key) {
  const params = {
    stateCode: query,
    limit,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  // National Parks GetParks API call
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
      }
    );
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  //iterate through the PARKS array (responseJson.data), stopping at the end of the list
  for (let i = 0; i < responseJson.data.length ; i++){    
    // add a list item to the results list for each park in the response array,
    // list with the fullName, states, description, url and directionsUrl 
    const result = responseJson.data[i];
    renderResult(result, i); 
    //display the results section  
    $('#results').removeClass('hidden');
    //display the results section  
    $('#displayAddress').removeClass('hidden');
  };
}


function closeResult() {
    //Watches close button and closes pop up results / resets search form
    $(".popup-overlay, .popup-content").removeClass("active");
    $('.main').removeClass('hidden');
    $('.popup-content').replaceWith(
            `
            <p id="js-error-message" class="error-message"></p>
                <section id="results" class="hidden">
                    <div id="results-list"></div> 
                </section> 
            `
        );
    $('#js-search-state').val('');
    $('#js-max-results').val('');
    $('#js-max-results').attr("type","text");
    }
    

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();

        setTimeout(function(){
            $('.confirm-submit').removeClass('hidden');
        }, 500);

        setTimeout(function(){

            if ($('#results').hasClass('hidden')) {
                $('.confirm-submit').addClass('hidden');
                $('.something-wrong').removeClass('hidden');
                $('#got-it').removeClass('hidden');
                $( "#got-it" ).click(function() {
                    $('.something-wrong').addClass('hidden');
                    $('#got-it').addClass('hidden');
                    $('#js-search-state').val('');
                    $('#js-max-results').val('');
                    $('#js-max-results').attr("type","text");
                });

            }
        
        }, 10000);

        const states ={
            "alabama":"AL",
            "alaska":"AK",
            "arizona":"AZ",
            "arkansas":"AR",
            "california":"CA",
            "colorado":"CO",
            "conneticut":"CT",
            "delaware":"DE",
            "district of columbia":"DC",
            "washington DC":"DC",
            "florida":"FL",
            "georgia":"GA",
            "hawaii":"HI",
            "idaho":"ID",
            "illinois":"IL",
            "indiana":"IN",
            "iowa":"IA",
            "kansas":"KS",
            "kentucky":"KY",
            "louisiana":"LA",
            "maine":"ME",
            "maryland":"MD",
            "massachusetts":"MA",
            "michigan":"MI",
            "minnesota":"MN",
            "mississippi":"MS",
            "missouri":"MO",
            "montana":"MT",
            "nebraska":"NE",
            "nevada":"NV",
            "new hampshire":"NH",
            "new jersey":"NJ",
            "new mexico":"NM",
            "new york":"NY",
            "north carolina":"NC",
            "north dakota":"ND",
            "ohio":"OH",
            "oklahoma":"OK",
            "oregon":"OR",
            "pennsylvania":"PA",
            "rhode island":"RI",
            "south carolina":"SC",
            "south dakota":"SD",
            "tennessee":"TN",
            "texas":"TX",
            "utah":"UT",
            "vermont":"VT",
            "virginia":"VA",
            "washington":"WA",
            "west virginia":"WV",
            "wisconsin":"WI",
            "wyoming":"WY"
        }

        $('.confirm-submit').addClass('hidden');
        $('.something-wrong').addClass('hidden');
    
        const fromInputBox = $('#js-search-state').val();
        const userTyped = fromInputBox.toLowerCase();

        if (userTyped in states === true) {
            let searchState = states[userTyped];  
            const maxResults = $('#js-max-results').val();
            getParksByState(searchState, maxResults);
        } 
        else {
            let searchState = $('#js-search-state').val();
            let searchStateTrimmed = searchState.replace(" " , "");
            searchStateTrimmed = searchStateTrimmed.replace(" " , "");
            const maxResults = $('#js-max-results').val();
            getParksByState(searchStateTrimmed, maxResults);
        }; 
      });


}
       
$(watchForm);




