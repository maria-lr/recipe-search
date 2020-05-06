const searchTerm = document.getElementById('searchbar').innerText;
const searchButton = document.getElementById('searchbutton');
const url = `https://recipepuppyproxy.herokuapp.com/api/?i=${searchTerm}`;

async function goGetDataFromRecipeAPI() {
  const result = await fetch(url);
  const json = await result.json();


}

goGetDataFromRecipeAPI();


searchButton.onclick = function (event) {

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