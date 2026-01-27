import React from "react";
import Hello from "./Hello";
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 89,
      count2: 90,
    };
  }
  render() {
    return (
      <div>
        <div className="main-container">
          <h1>About</h1>
          <h2>Learning about React</h2>
          <div className="user-card">
            <h2>Count is: {this.state.count}</h2>
            <h2>Count2 is: {this.state.count2}</h2>
            <button
              onClick={() => {
                this.setState({
                  count: ++this.state.count,
                  count2: ++this.state.count,
                });
              }}
            >
              Count ++
            </button>
            <h3>Name is: {this.props.name}</h3>
            <h3>Location is: {this.props.location}</h3>
          </div>
          <User />
        </div>
        <Hello />
      </div>
    );
  }
}

class User extends React.Component {
  constructor() {
    super();
    console.log("Parent constructor");
  }

  componentDidMount() {
    console.log("Parent ComponentDidMount");
  }

  render() {
    return (
      <>
        {console.log("Parent Render")}
        <h1>Parent</h1>
        <Child />
      </>
    );
  }
}

class Child extends React.Component {
  constructor() {
    super();
    console.log("Child 1 constructor");
  }

  componentDidMount() {
    console.log("Child 1 ComponentDidMount");
  }

  render() {
    return (
      <>
        {console.log("Child Render")}
        <h2>Child 1</h2>
        <GrandChild />
      </>
    );
  }
}
class GrandChild extends React.Component {
  constructor() {
    super();
    console.log("GrandChild constructor");
  }

  componentDidMount() {
    console.log("GrandChild ComponentDidMount");
  }

  render() {
    return (
      <>
        {console.log("GrandChild Render")}
        <h2>GrandChild</h2>
      </>
    );
  }
}

export default About;
