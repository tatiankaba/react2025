import React, { Component } from "react";
import "./results.css";

interface Props {
  query: string;
}

type Pet = {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
};

interface AnimalSearchResponse {
  animals: Pet[];
}

interface State {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

export default class Results extends Component<Props, State> {
  state: State = {
    pets: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchData(this.props.query);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.query !== this.props.query) {
      this.fetchData(this.props.query);
    }
  }

  fetchData(query: string) {
    this.setState({ loading: true, error: null });

    const url = !query
      ? "https://stapi.co/api/v1/rest/animal/search?pageNumber=0&pageSize=10"
      : `https://stapi.co/api/v1/rest/animal/search?name=${encodeURIComponent(
          query,
        )}&pageNumber=0&pageSize=1000`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((data: AnimalSearchResponse) => {
        const filteredPets = query
          ? data.animals.filter((pet) =>
              pet.name.toLowerCase().includes(query.toLowerCase()),
            )
          : data.animals;

        this.setState({ pets: filteredPets });
      })
      .catch((error: Error) => this.setState({ error: error.message }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { loading, error, pets } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
      <section>
        <h2>Results</h2>
        {pets.length === 0 ? (
          <p>No animals</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Earth Animal</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.uid}>
                  <td>{pet.name}</td>
                  <td>{pet.earthAnimal ? "Да" : "Нет"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    );
  }
}
