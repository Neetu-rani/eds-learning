
export default async function decorate(widget) {
  // Parameters from the widget URL are available as data attributes.
  // const name = widget.dataset.name || 'world';
  // const target = widget.querySelector('.name');
  // if (target) target.textContent = name;
const brand = await getBrands();
renderBrands(widget, brand);

}

async function getBrands() {
const response =  await fetch('/widgets/dealer-locator/popular-food-brand.json');
  const data = await response.json();
  console.log("helooooooooooo", data);
  return data;
}

function renderBrands(widget, brands) {
  console.log(widget);
console.log(widget.querySelector('.dealer-list'));
  const dealerList = widget.querySelector('.dealer-list');
  if (!dealerList) {
    console.error('dealer-list not found');
    return;
  }
  dealerList.innerHTML = brands.map((brand) => `
    <div class="dealer-card">
      <div class="dealer-name">${brand.brandName}</div>

      <div class="dealer-address">${brand.address}</div>

      <div class="dealer-phone">${brand.phone}</div>

      <a href="${brand.directions}" target="_blank">
        Get Directions
      </a>
    </div>
  `).join('');
}
