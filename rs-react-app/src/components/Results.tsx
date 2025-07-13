import "./results.css";
import { useEffect, useState } from "react";

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

export default function Results({ query }: Props) {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = !query
      ? "https://stapi.co/api/v1/rest/animal/search?pageNumber=0&pageSize=10"
      : `https://stapi.co/api/v1/rest/animal/search?name=${encodeURIComponent(query)}&pageNumber=0&pageSize=1000`;
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

        setPets(filteredPets);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [query]);

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
