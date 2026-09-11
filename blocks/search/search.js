export default async function decorate(block) {
  block.innerHTML = `
    <div class="search-wrapper">
      <input
        type="text"
        class="search-input"
        placeholder="Search pages or recipes..."
      />
      <div class="search-results"></div>
    </div>
  `;

  const input = block.querySelector('.search-input');
  const results = block.querySelector('.search-results');

  let pageData = [];
  let recipeData = [];

  try {
    // Query Index Data
    const pageResponse = await fetch('/query-index.json');
    const pageJson = await pageResponse.json();
    pageData = pageJson.data || [];

    // Recipe Data
    const recipeResponse = await fetch('https://dummyjson.com/recipes');
    const recipeJson = await recipeResponse.json();
    recipeData = recipeJson.recipes || [];
  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>Unable to load search data.</p>';
    return;
  }

  input.addEventListener('input', () => {
    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
      results.innerHTML = '';
      return;
    }

    // Page results
    const pageResults = pageData.filter((item) => {
      const title = item.title?.toLowerCase() || '';
      const description = item.description?.toLowerCase() || '';
      const category = item.category?.toLowerCase() || '';

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword)
      );
    });

    // Recipe results
    const recipeResults = recipeData.filter((recipe) => {
      const name = recipe.name?.toLowerCase() || '';
      const cuisine = recipe.cuisine?.toLowerCase() || '';
      const difficulty = recipe.difficulty?.toLowerCase() || '';

      return (
        name.includes(keyword) ||
        cuisine.includes(keyword) ||
        difficulty.includes(keyword)
      );
    });

    let html = '';

    if (pageResults.length) {
      html += `
        <h2>Pages</h2>

        ${pageResults
          .map(
            (item) => `
              <div class="search-card">
                ${item.path}
                  <h3>${item.title || 'Untitled'}</h3>
                </a>

                <p>${item.description || ''}</p>

                ${
                  item.category
                    ? `<span>${item.category}</span>`
                    : ''
                }
              </div>
            `,
          )
          .join('')}
      `;
    }

    if (recipeResults.length) {
      html += `
        <h2>Recipes</h2>

        ${recipeResults
          .map(
            (recipe) => `
              <div class="search-card">
                ${recipe.image}

                <h3>${recipe.name}</h3>

                <p>Cuisine: ${recipe.cuisine}</p>

                <p>Difficulty: ${recipe.difficulty}</p>

                <p>⭐ Rating: ${recipe.rating}</p>
              </div>
            `,
          )
          .join('')}
      `;
    }

    if (!html) {
      html = '<p>No results found.</p>';
    }

    results.innerHTML = html;
  });
}
