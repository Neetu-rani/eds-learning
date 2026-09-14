import DA_SDK from 'https://da.live/nx/utils/sdk.js';

console.log('Plugin loaded successfully');

(async function init() {
  console.log('Inside init');

  const { context, token } = await DA_SDK;

  console.log('Context:', context);
  console.log('Token:', token);

  if (context) {
    document.body.innerHTML = `
      <h2>EDS Plugin Working ✅</h2>
      <p>Org: ${context.org}</p>
      <p>Repo: ${context.repo}</p>
      <p>Path: ${context.path}</p>
    `;
  }
})();