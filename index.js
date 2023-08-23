/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    const gamesContainer = document.getElementById('games-container');

    for (const game of games) {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card'); // Assuming you have a CSS class for styling game cards

        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h2>${game.name}</h2>
            <p>Genre: ${game.goal}</p>
            <p>Rating: ${game.description}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}


addGamesToPage(GAMES_JSON);

function calculateTotalContributions(games) {
    return games.reduce((totalContributions, game) => totalContributions + game.backers, 0);
}

function updateContributionsCard(totalContributions) {
    const contributionsCard = document.getElementById('num-contributions');
    contributionsCard.textContent = `${totalContributions.toLocaleString()}`;
}

const totalContributions = calculateTotalContributions(GAMES_JSON);

// Call the function to update the contributions card with the calculated total contributions
updateContributionsCard(totalContributions);

function calculateTotalPledged(games) {
    return games.reduce((totalPledged, game) => totalPledged + game.pledged, 0);
}

function updateRaisedCard(totalPledged) {
    const raisedCard = document.getElementById('total-raised');
    raisedCard.textContent = `$${totalPledged.toLocaleString()}`;
}

const totalPledged = calculateTotalPledged(GAMES_JSON);

updateRaisedCard(totalPledged);

function calculateTotalGames(games) {
    return games.length; 
}

function updateGamesCard(totalGames) {
    const gamesCard = document.getElementById('num-games');
    gamesCard.textContent = `${totalGames}`;
}

const totalGames = calculateTotalGames(GAMES_JSON); // Calculate the total number of games
updateGamesCard(totalGames);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    
    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

const gamesContainer = document.getElementById('games-container');
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);





/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const fundedGames = GAMES_JSON.length - unfundedGamesCount;

const raisedAmount = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

const template = `A total of $${raisedAmount.toLocaleString()} ${fundedGames === 1 ? 'has' : 'have'} been raised for ${fundedGames.toLocaleString()} ${fundedGames === 1 ? 'game' : 'games'}. Currently, ${unfundedGamesCount.toLocaleString()} ${unfundedGamesCount === 1 ? 'game' : 'games'} ${unfundedGamesCount === 1 ? 'remains' : 'remain'} unfunded. We need your help to fund ${unfundedGamesCount === 1 ? 'this' : 'these'} amazing ${unfundedGamesCount === 1 ? 'game' : 'games'}!`;


const descriptionParagraph = document.createElement('p');
descriptionParagraph.textContent = template;

// Get the description container and append the new paragraph element
descriptionContainer.appendChild(descriptionParagraph);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondTopGame, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement('first-game');
topGameElement.textContent = `${topGame.name}`;


const secondTopGameElement = document.createElement('second-game');
secondTopGameElement.textContent = `${secondTopGame.name}`;



firstGameContainer.appendChild(topGameElement);
secondGameContainer.appendChild(secondTopGameElement);
// do the same for the runner up item

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Function to filter games based on the search query
function filterGames(query) {
    return GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(query.toLowerCase())
    );
}

function displayFilteredGames(filteredGames) {
    // Clear existing games from the games container
    gamesContainer.innerHTML = '';

    // Add the filtered games to the games container
    filteredGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        
        // Create and set the game title
        const titleElement = document.createElement('h2');
        titleElement.textContent = game.name;
        gameCard.appendChild(titleElement);
        
        // Create and set the game image
        const imageElement = document.createElement('img');
        imageElement.src = game.img;
        imageElement.alt = game.name;
        imageElement.style.maxWidth = '100%'; // Resize width
        imageElement.style.height = 'auto';   // Maintain aspect ratio
        gameCard.appendChild(imageElement);
        
        // Create and set the game details (replace with actual properties)
        const detailsElement = document.createElement('p');
        detailsElement.textContent = `Rating: ${game.description}, Genre: ${game.goal}`;
        gameCard.appendChild(detailsElement);

        gamesContainer.appendChild(gameCard);
    });
}

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    const filteredGames = filterGames(searchTerm);
    displayFilteredGames(filteredGames);
});