export default function decorate(block) {
  console.log('HELLO BLOCK LOADED');

  block.innerHTML = `
    <div>
      <h1>Hello From My First Block 🚀</h1>
    </div>
  `;
}