export function createElement(tagOrComponent, attributes, ...children) {
  let elm;
  if (typeof tagOrComponent === 'string') {
    elm = new ElementWrapper(tagOrComponent);
  } else {
    elm = new tagOrComponent();
  }

  for (let p in attributes) {
    elm.setAttribute(p, attributes[p]);
  }

  children = children.flat();
  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child);
    }
    elm.appendChild(child);
  }
  return elm;
}

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(component) {
    this.root.appendChild(component.root);
  }
}

class TextWrapper {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
  get root() {
    return this.render().root;
  }
}

export function render(component, elm) {
  elm.appendChild(component.root);
}
