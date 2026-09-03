export default function decorate(block) {

  block.innerHTML = `
    <div class="search-widget">

      <h2>Search Products</h2>

      <div class="search-bar">
        <input
          type="text"
          id="searchInput"
          placeholder="Search product..."
        />

        <button id="searchBtn">
          Search
        </button>
      </div>

      <div id="results"></div>

    </div>
  `;

}