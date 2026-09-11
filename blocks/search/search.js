export default async function decorate(block) {
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'search-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search pages...';

  const results = document.createElement('div');
  results.className = 'search-results';

  searchWrapper.append(input, results);
  block.append(searchWrapper);

  let indexData = [];

  try {
    const response = await fetch('/query-index.json');
    const data = await response.json();

    indexData = data.data || [];
  } catch (error) {
    console.error('Index loading failed', error);

    results.innerHTML = `
      <p>Unable to load search data.</p>
    `;
  }

  input.addEventListener('input', () => {
    const keyword = input.value.trim().toLowerCase();

    if (!keyword) {
      results.innerHTML = '';
      return;
    }

    const filtered = indexData.filter((item) => {
      const title = item.title?.toLowerCase() || '';
      const description = item.description?.toLowerCase() || '';
      const category = item.category?.toLowerCase() || '';

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword)
      );
    });

    if (!filtered.length) {
      results.innerHTML = `
        <p>No results found.</p>
      `;
      return;
    }

    results.innerHTML = filtered
      .map(
        (item) => `
          <div class="search-card">
            ${item.path}
              <h3>${item.title || 'Untitled'}</h3>
            </a>

            <p>${item.description || ''}</p>

            ${
              item.category
                ? `<span class="category">${item.category}</span>`
                : ''
            }
          </div>
        `
      )
      .join('');
  });
}