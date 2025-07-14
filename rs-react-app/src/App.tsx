import React, { Component } from "react";
import Results from "./components/Results";
import TopControls from "./components/TopControls";
import "./App.css";

interface State {
  query: string;
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      query: localStorage.getItem("name") || "",
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query: string) {
    this.setState({ query });
  }

  render() {
    return (
      <>
        <TopControls onSearch={this.handleSearch} />
        <Results query={this.state.query} />
      </>
    );
  }
}
