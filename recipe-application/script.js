async function fetchRecipes() {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    if (data.recipes && Array.isArray(data.recipes)) {
      populateRecipes(data.recipes);
    } else {
      console.error("No recipes found in the API response.");
      document.getElementById("recipes").innerHTML =
        "<p>No recipes available at the moment.</p>";
    }
    populateRecipes(data.recipes); // Pass recipes to the function
  } catch (error) {
    document.getElementById("recipes").innerHTML =
      "<p>Failed to load recipes. Please try again later.</p>";
  }
}

function populateRecipes(recipes) {
  const recipesContainer = document.getElementById("recipes");

  recipesContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeHTML = `
      <div class="recipe-card">
        <!-- Recipe Image -->
        <img src="${recipe.image || "https://via.placeholder.com/300"}" alt="${
      recipe.name
    }" class="recipe-image" />
        <div class="card-body">
          <p class="recipe-name">${recipe.name}</p>
          <div class="recipe-details">
            <div class="detail">
              <img src="/images/mdi--clock-time-eight-outline 1.svg"
                alt="Time"
              />
              <span>${recipe.cookTimeMinutes}</span>
            </div>

            <div class="detail">
              <img src="/images/mdi--fire.svg" alt="Calorie" />
              <span>${recipe.caloriesPerServing}</span>
            </div>

            <div class="detail">
              <img src="/images/mdi--star.svg" alt="Rating" />
              <span>${recipe.rating} (${recipe.reviewCount})</span>
            </div>
          </div>
          <button class="showRecipe" onclick="viewRecipe(${
            recipe.id
          })">View</button>
        </div>
      </div>
    `;
    recipesContainer.innerHTML += recipeHTML;
  });
}

function viewRecipe(recipeId) {
  // Redirect to a new page with the recipe ID in the query string
  window.location.href = `recipe.html?id=${recipeId}`;
}

fetchRecipes();
