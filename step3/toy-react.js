function isObject(a) {
  return a !== null && typeof a === 'object';
}

function isArray(a) {
  return Array.isArray(a);
}

const domPropertyMap = { 'className': 'class', 'htmlFor': 'for' };
    
function createElement(type, attributes, ...children) {
  let elm;
  if (typeof type === 'string') {
    elm = new ElementWrapper(type);
  } else if (Component.isPrototypeOf(type)) {
    elm = new type();
  } else if (typeof type === 'function') {
    elm = new Component();
    elm.render = function () {
      return type(this.props);
    }
  } else {
    return;
  }

  for (let p in attributes) {
    elm.setAttribute(p, attributes[p]);
  }

  children = children.flat();
  for (let child of children) {
    if (child === null) continue;
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
    if (domPropertyMap[name]) {
      name = domPropertyMap[name];
    }
    if (name.match(/^on([a-zA-Z]+)/)) {
      this.root.addEventListener(RegExp.$1.toLowerCase(),value);
    } else {
      this.root.setAttribute(name, value);
    }
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

class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
  rerender() {
    this._root.innerHTML = '';
    const container = this.render().root;
    let n = container.childNodes.length;
    while (n--) {
      this._root.appendChild(container.childNodes[0]);
    }
  }
  setState(state) {
    function merge(oldState, newState) {
      for (const p in newState) {
        if (isArray(newState[p])) {
          if (!isArray(oldState[p])) oldState[p] = [];
          merge(oldState[p], newState[p]);
        } else if (isObject(newState[p])) {
          if (!isObject(oldState[p])) oldState[p] = {};
          merge(oldState[p], newState[p]);
        } else {
          oldState[p] = newState[p];
        }
      }
    }

    merge(this.state, state);
    this.rerender();
  }
}

function render(component, el) {
  el.appendChild(component.root);
}

export default {
  Component,
  createElement,
  render,
}
