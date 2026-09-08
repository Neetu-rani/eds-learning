export default function decorate(block) {
  block.innerHTML = `
    <div class="product-search-widget">
    <div class="default-content-wrapper">
      <p>Search Recipes</p>
    </div>

      <input
        type="text"
        id="searchInput"
        placeholder="Search Food..."
      />

      <button id="searchBtn">
        Search
      </button>

      <div id="results"></div>
    </div>
  `;

  const searchBtn = block.querySelector('#searchBtn');
  const searchInput = block.querySelector('#searchInput');
  const results = block.querySelector('#results');

  async function searchRecipes() {
    const keyword = searchInput.value.trim();

    if (!keyword) {
      return;
    }

    results.innerHTML = '<p>Loading...</p>';

    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${keyword}`
      );

      const data = await response.json();

      console.log('Recipes:', data.recipes);

      renderRecipes(data.recipes);
    } catch (error) {
      console.error(error);
      results.innerHTML = '<p>Something went wrong.</p>';
    }
  }

  searchBtn.addEventListener('click', searchRecipes);

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchRecipes();
    }
  });

  function renderRecipes(recipes) {
    if (!recipes.length) {
      results.innerHTML = '<p>No recipes found.</p>';
      return;
    }

    results.innerHTML = `
      <div class="cards-container">
        ${recipes.map((recipe) => `
          <div class="card">
            <img src="${recipe.image}">

            <p>Cuisine: ${recipe.cuisine}</p>

            <p>Difficulty: ${recipe.difficulty}</p>

            <p>⭐ Rating: ${recipe.rating}</p>

            <button>View Recipe</button>
          </div>
        `).join('')}
      </div>
    `;
  }
}