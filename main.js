const searchButton = document.getElementById('searchbutton');
const searchBar = document.getElementById('searchbar')


// Trigger button on enter code from w3Schools:https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp

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
  document.getElementById("see-below").style.visibility = "visible";
  if (searchBar.value === "") {
    return;
  }

  searchButton.style.color = '#759677';

  let recipeResults = document.getElementById('recipelist')
  recipeResults.innerHTML = '';

  const searchTerm = document.getElementById('searchbar').value;
  const url = `https://recipepuppyproxy.herokuapp.com/api/?i=${searchTerm}`;


  console.log("What is my url?", url)

  async function goGetDataFromRecipeAPI() {
    const result = await fetch(url);
    const json = await result.json();
    let recipeArray = json.results;

    console.log(recipeArray);

    recipeArray.forEach(function (recipe) {
      console.log('Recipe:', recipe.title)
      console.log('Picture', recipe.thumbnail)
      console.log('Ingredients', recipe.ingredients)

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

      let recipeImage = document.createElement("img");
      recipeImage.src = recipe.thumbnail;
      recipeImage.classList.add('recipe-image')
      // append img to div you just made
      newRecipeCard.appendChild(recipeImage);

      let recipeTitle = document.createElement("h2");
      const recipeTitleWithoutLineBreaks = recipe.title.replace(/(\r\n|\n|\r)/gm, "");
      recipeTitle.innerText = recipeTitleWithoutLineBreaks;
      newRecipeCard.appendChild(recipeTitle);

      let recipeIngredientsTitle = document.createElement("h3");
      recipeIngredientsTitle.innerText = "Ingredients";
      recipeIngredientsTitle.classList.add('ingredients-title')
      newRecipeCard.appendChild(recipeIngredientsTitle);

      let recipeIngredients = document.createElement("p");
      recipeIngredients.innerText = recipe.ingredients;
      newRecipeCard.appendChild(recipeIngredients);

      let recipeDirectionsTitle = document.createElement("h3");
      recipeDirectionsTitle.classList.add('directions-title')
      recipeDirectionsTitle.innerText = "Directions"
      newRecipeCard.appendChild(recipeDirectionsTitle);

      let recipeDirections = document.createElement("p");
      recipeDirections.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      newRecipeCard.appendChild(recipeDirections)

    };

    // const allRecipeResults = document.querySelectorAll('#recipelist div');

    // console.log('Recipe Divs', allRecipeResults);



  }


  goGetDataFromRecipeAPI();



  // function generateRecipeCards(div) {
  // div.forEach(createRecipeCard);
  // return json.title.includes(searchTerm) && json.ingredients.includes(searchTerm)
}



const placeholder = document.getElementById('searchbar')
const recipeType = ['chicken', 'tofu', 'bread', 'beef', 'carrot', 'banana', 'turkey', 'meatloaf', 'lasagna', 'salad', 'spinach', 'beer', 'rice', 'caramel', 'cookie'];

function changePlaceholder() {
  const randomRecipe = recipeType[Math.floor(Math.random() * recipeType.length)];
  placeholder.setAttribute('placeholder', randomRecipe);

};

const textChangeInterval = setInterval(changePlaceholder, 1000);

placeholder.onclick = function (event) {
  clearInterval(textChangeInterval);
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




// function consoleLog() {
//   console.log("We did a thing!")
// }

// setInterval(consoleLog, 1000);