export default async function decorate(block) {
    console.log("block", block)
  const link = block.querySelector('a');

  if (!link) return;

  const widgetUrl = link.href;

  try {
    const resp = await fetch(widgetUrl);
    const html = await resp.text();

    block.innerHTML = html;

    const widgetName = widgetUrl.split('/').slice(-2, -1)[0];

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `/widgets/${widgetName}/${widgetName}.css`;
    document.head.append(css);

    const mod = await import(
      `/widgets/${widgetName}/${widgetName}.js`
    );

    if (mod.default) {
      mod.default(block);
    }
  } catch (e) {
    console.error('Widget load failed', e);
  }
}