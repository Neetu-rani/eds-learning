export default function decorate(block) {

  const cards = [...block.children];

  const container = document.createElement('div');
  container.className = 'cards-container';

  cards.forEach((card) => {
    const cols = [...card.children];

    const image = cols[0]?.innerHTML || '';
    const title = cols[1]?.textContent.trim() || '';
    const description = cols[2]?.textContent.trim() || '';
    const buttonText = cols[3]?.textContent.trim() || '';

    const cardElement = document.createElement('div');

    cardElement.className = 'card';

    cardElement.innerHTML = `
      ${image}
      <h3>${title}</h3>
      <p>${description}</p>
      <button>${buttonText}</button>
    `;

    container.append(cardElement);
  });

  block.innerHTML = '';
  block.append(container);
}