export default function decorate(block) {
  const rows = [...block.children];

  const image = rows[1]?.textContent.trim();
  const heading = rows[2]?.textContent.trim();
  const description = rows[3]?.textContent.trim();
  const buttonText = rows[4]?.textContent.trim();

  block.innerHTML = `
    <div class="hero-banner">
      ${image}
      
      <div class="hero-content">
        <h1>${heading}</h1>
        <p>${description}</p>
        <button>${buttonText}</button>
      </div>
    </div>
  `;
}
``