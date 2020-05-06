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
      console.log('Picture', recipe.href)
      console.log('Ingredients', recipe.ingredients)

    })

    const recipeResults = document.getElementById('recipeCards')

    // How to create a new element and define its design.
    function createRecipeCard() {
      let newRecipeCard = document.createElement("div");
      newRecipeCard.style.maxHeight = "500px";
      newRecipeCard.style.minHeight = "300px";
      newRecipeCard.style.maxWidth = "80%";
      newRecipeCard.style.minWidth = "65%";
      // newRecipeCard.style.display = "inline-block";
      newRecipeCard.style.padding = "20px";
      newRecipeCard.style.backgroundColor = "black";
      recipeResults.appendChild(newRecipeCard)
    };

    // const allRecipeResults = document.querySelectorAll('#recipelist div');

    // console.log('Recipe Divs', allRecipeResults);

    document.getElementById('results-page').style.display = 'flex';

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