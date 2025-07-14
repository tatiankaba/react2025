import React, { Component } from "react";
import type { FormEvent, ChangeEvent } from "react";

interface Props {
  onSearch: (value: string) => void;
}

interface State {
  name: string;
}

export default class TopControls extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: localStorage.getItem("name") || "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = this.state.name.trim();
    if (trimmedName.length === 0) return;
    localStorage.setItem("name", trimmedName);
    this.props.onSearch(trimmedName);
  }

  render() {
    return (
      <section>
        <h2>Top controls</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            name="search"
            id="search"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </section>
    );
  }
}
