// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. Get 'recipes' from localStorage and parse it
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

function addRecipesToDocument(recipes) {
	// A10. Get a reference to the <main> element
	const main = document.querySelector('main');

	// A11. Loop through recipes and add each as a <recipe-card>
	recipes.forEach(recipeData => {
		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipeData;
		main.appendChild(recipeCard);
	});
}


/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element
	const form = document.getElementById('new-recipe');

	// B3. TODO - Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		// Steps B4-B9 will occur inside the event listener from step B3

		// B4. TODO - Create a new FormData object from the <form> element reference above
		const formData = new FormData(form);

		// B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
		//            make this easier to read), and then extract the keys and corresponding
		//            values from the FormData object and insert them into recipeObject
		const recipeObject = {};
		for (const [key, value] of formData.entries()) {
			if (key === 'rating' || key === 'numRatings') {
				recipeObject[key] = Number(value);
			} else {
				recipeObject[key] = value;
			}
		}

		// B6. TODO - Create a new <recipe-card> element
		const recipeCard = document.createElement('recipe-card');

		// B7. TODO - Add the recipeObject data to <recipe-card> using element.data
		recipeCard.data = recipeObject;

		// B8. TODO - Append this new <recipe-card> to <main>
		const main = document.querySelector('main');
		main.appendChild(recipeCard);

		// B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
		//            then save the recipes array back to localStorage
		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);
	});

	// B10. TODO - Get a reference to the "Clear Local Storage" button
	const clearButton = document.querySelector('button.danger');

	// B11. TODO - Add a click event listener to clear local storage button
	clearButton.addEventListener('click', () => {
		// Steps B12 & B13 will occur inside the event listener from step B11

		// B12. TODO - Clear the local storage
		localStorage.clear();

		// B13. TODO - Delete the contents of <main>
		document.querySelector('main').innerHTML = '';
	});
}

