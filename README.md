# 自制简易 React 框架

## Day 1
### 阶段 0: 环境搭建

实验内容
- 配置 Webpack
- 配置 babel-loader
- 配置 `@babel/preset-env` 和 `@babel/plugin-transform-react-jsx`

参考资料
- https://babeljs.io/docs/en/babel-plugin-transform-react-jsx

对于下面这段代码。
```javascript
let div = <div id="nav" class="ml-2">
  <div></div>
  <div></div>
</div>
```

完成实验后可以生成如下代码。
```javascript
var div = createElement("div", {
  id: "nav",
  "class": "ml-2"
}, createElement("div", null), createElement("div", null));
```

### 阶段 1: 实现 createElement()

createElement() 代码如下。
```javascript
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
```

完成实验后，我们就可以用 JSX 实现在 JavaScript 中编写 HTML。这个实验体现了 JSX 只是语法糖，不是模板。

### 阶段 2: 实现类组件
JSX 有个约定，当 tag 是小写开头的时候就会当做原生 HTML 标签处理，是大写开头的时候就会当做一个组件。组件是一个类，React Hooks 中组件也可以是函数式组件，为了简单我们不实现函数式组件。

这次实验我们要实现对下面这段 JSX 的处理。

```javascript
import { createElement, Component, render } from './toy-react.js';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>my component</h1>
        { this.children }
      </div>
    );
  }
}

let app = (
  <MyComponent>
    <div>hello</div>
    <div>world</div>
    <MyComponent>
      <div>hello</div>
      <div>world</div>
      <div>world</div>
    </MyComponent>
  </MyComponent>
);

render(app, document.body);
```

实验的难点是要将组件类和 HTMLElement 统一，有两种方案。方案 1 不太靠谱，我们选用方案 2。
1. 让组件类实现 HTMLElement 的接口，例如 `appendChild()`、`setAttribute()`
2. 使用包装类技术，对 HTMLElement 进行包装
