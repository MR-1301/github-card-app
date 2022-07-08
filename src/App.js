import "./App.css";
import React from "react";
import axios from "axios";
// IMP NOTE:
//the inline styles takes up js as a input and will result in a key-value object pair of styles for that element :P

const CardList = (props) => {
  return (
    <div>
      {props.profiles.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <>
        <div className="github-profile">
          <img src={profile.avatar_url} alt="LOL" />
          <div
            className="info"
            style={{ display: "inline-block", marginLeft: "12px" }}
          >
            <div className="name">{profile.name}</div>
            <div className="company">{profile.company}</div>
          </div>
        </div>
      </>
    );
  }
}

class Form extends React.Component {
  // using ref to handel input value
  //userNameInput = React.createRef();

  //state method (not using refs)
  state = {
    userName: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.toAddData(resp.data);
    this.setState({ userName: "" });
  };

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          // ref={this.userNameInput} => for using refs
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="Github Username"
          required
        />
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  //Older Syntax

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  // }

  // Newer Syntax

  state = {
    profiles: [],
  };

  addNewProfile = (profileData) => {
    this.setState({
      profiles: [...this.state.profiles, profileData],
    });
  };

  render() {
    return (
      <>
        <div
          className="greetMessage"
          style={{ color: Math.random() > 0.5 ? "green" : "orange" }}
        >
          Hello There! and Welcome
        </div>
        <div>
          <div className="header">{this.props.title}</div>
          <Form toAddData={this.addNewProfile} />
          <CardList profiles={this.state.profiles} />
        </div>
      </>
    );
  }
}

export default App;
