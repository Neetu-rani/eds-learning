export default function decorate(block) {
    const picture = block.querySelector('picture');
    const rows = [...block.children];
    const content = [...block.querySelectorAll('p')];
    const title = rows[1]?.textContent.trim() || '';

    const description = rows[2]?.textContent.trim() || '';

    const buttonText = rows[3]?.textContent.trim() || '';
    block.innerHTML = '';

    const hero = document.createElement('div');


    hero.className = 'hero-banner';

    hero.append(picture);

    hero.innerHTML += `
    <div class="hero-content">
      <h1>${title}</h1>
      <p>${description}</p>
      <button>${buttonText}</button>
    </div>
  `;

    block.append(hero);
}
