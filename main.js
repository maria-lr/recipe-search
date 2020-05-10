const searchButton = document.getElementById('searchbutton');
const searchBar = document.getElementById('searchbar')


// Can trigger the search button with the Enter key. Trigger button on enter code from w3Schools:https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

// Execute a function when the user releases a key on the keyboard
searchBar.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchButton.click();
  }
});


searchButton.onclick = function (event) {

  // Show the results page when search button is clicked.
  document.getElementById("see-below").style.visibility = "visible";

  // Do not allow search on search button click if the searchbar is empty. 
  if (searchBar.value === "") {
    return;
  }

  // On search click, clear the page of any previous results.
  let recipeResults = document.getElementById('recipelist')
  recipeResults.innerHTML = '';

  const searchTerm = document.getElementById('searchbar').value;
  const url = `https://recipepuppyproxy.herokuapp.com/api/?i=${searchTerm}`;


  console.log("What is my url?", url)

  // Async-await data fetching from API. Linking up an API and converting the results to a readable format: JSON.
  async function goGetDataFromRecipeAPI() {
    const result = await fetch(url);
    const json = await result.json();
    let recipeArray = json.results;

    console.log(recipeArray);

    recipeArray.forEach(function (recipe) {
      console.log('Recipe:', recipe.title)
      console.log('Picture', recipe.thumbnail)
      console.log('Ingredients', recipe.ingredients)

      // For each recipe in the recipe array create a recipe card. (needto pass the recipe argument through forEach, the below function call and the function definition outside of this scope for it to work).
      createRecipeCard(recipe);
    })

    document.getElementById('results-page').style.display = 'flex';

    // How to create a new element and define its design.
    function createRecipeCard(recipe) {
      // const recipeResults = document.getElementById('recipelist')
      let newRecipeCard = document.createElement("div");
      newRecipeCard.classList.add('recipe-card')

      console.log("What is recipe results?", recipeResults)
      recipeResults.appendChild(newRecipeCard);

      // Create a new element (p, h2, img) for each part of the recipe card.
      let recipeImage = document.createElement("img");
      recipeImage.src = recipe.thumbnail;

      // Add a class to the element you just created to style the new element.
      recipeImage.classList.add('recipe-image')
      // append img/element to the recipe card/div you just made.
      newRecipeCard.appendChild(recipeImage);

      let recipeTitle = document.createElement("h2");

      // For some reason, the API response had line in random areas. The Replace method below uses a regex to find the line breaks in the first argument and replaces them with what's in the second argument: an empty string.
      const recipeTitleWithoutLineBreaks = recipe.title.replace(/(\r\n|\n|\r)/gm, "");
      recipeTitle.classList.add('recipe-title', 'recipe-text')
      recipeTitle.innerText = recipeTitleWithoutLineBreaks;
      newRecipeCard.appendChild(recipeTitle);

      let recipeIngredientsTitle = document.createElement("h3");
      recipeIngredientsTitle.innerText = "Ingredients";
      recipeIngredientsTitle.classList.add('ingredients-title', 'recipe-text')
      newRecipeCard.appendChild(recipeIngredientsTitle);

      let recipeIngredients = document.createElement("p");
      recipeIngredients.classList.add('recipe-text')
      recipeIngredients.innerText = recipe.ingredients;
      newRecipeCard.appendChild(recipeIngredients);

      let recipeDirectionsTitle = document.createElement("h3");
      recipeDirectionsTitle.classList.add('directions-title', 'recipe-text')
      recipeDirectionsTitle.innerText = "Directions"
      newRecipeCard.appendChild(recipeDirectionsTitle);

      let recipeDirections = document.createElement("p");
      recipeDirections.classList.add('recipe-text')
      recipeDirections.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      newRecipeCard.appendChild(recipeDirections)

    };
  }

  // Run the encompassing function.
  goGetDataFromRecipeAPI();

}

// Grab the placeholder element and put random search suggestions inside. 
const placeholder = document.getElementById('searchbar')
const recipeType = ['chicken', 'tofu', 'bread', 'beef', 'carrot', 'banana', 'turkey', 'meatloaf', 'lasagna', 'salad', 'spinach', 'beer', 'rice', 'caramel', 'cookie'];


function changePlaceholder() {
  const randomRecipe = recipeType[Math.floor(Math.random() * recipeType.length)];

  // For input with a placeholder attribute, you need to use setAttribute to make changes. It will not work to try to make changes only to the searchbar element since Placeholder is an attribute of the input element.
  placeholder.setAttribute('placeholder', randomRecipe);

};

// Use setInterval to run the changePlaceholder function in the first argument and set the speed in the second argument.
const textChangeInterval = setInterval(changePlaceholder, 1000);

// Clear the searchbar of the placeholder when it's clicked.
placeholder.onclick = function (event) {
  clearInterval(textChangeInterval);

  // Take the placeholder attribute and set it to an empty string.
  placeholder.setAttribute('placeholder', '')
}

// The code below from: https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2 will listen for the first keydown to be a tab (signifiying keyboard-only users). 
function handleFirstTab(e) {
  if (e.keyCode === 9) { // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}

window.addEventListener('keydown', handleFirstTab);