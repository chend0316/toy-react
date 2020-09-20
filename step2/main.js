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
