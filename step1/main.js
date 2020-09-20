function createElement(tagName, attributes, ...children) {
  let elm = document.createElement(tagName);
  for (let p in attributes) {
    elm.setAttribute(p, attributes[p]);
  }
  for (let child of children) {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }
    elm.appendChild(child);
  }
  return elm;
}

window.app = <div id="app" class="ml-2">
  <div>hello</div>
  <div></div>
</div>
