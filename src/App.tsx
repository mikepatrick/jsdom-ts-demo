import * as React from 'react';
import './App.css';
import Dropzone from './MyDropzone';

const logo = require('./logo.svg');

type IResult<P> = { [key in keyof P]: P[key] };
interface Footype<T = T> { foo: T; }
// tslint:disable-next-line:interface-name
interface IRProps<T = T> {
  data: T;
  children(data: IResult<T>): React.ReactNode;
}

class Resource extends React.Component<IRProps<Footype<number>>> {
  render() {
    return this.props.children(this.props.data);
  }
}

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <Dropzone/>
      <Resource data={{ foo: 1}}>{data => data.foo}</Resource>;
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
