import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export default function TopControls({ onSearch }: Props) {
  const [name, setName] = useState(localStorage.getItem("name") || "");

  function handleClick(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (name.trim().length === 0) return;
    localStorage.setItem("name", name.trim());
    onSearch(name.trim());
  }

  // function debounce(time: number, callback: () => void): () => void {
  // let timer: ReturnType<typeof setTimeout>;

  // return function (): void {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //     callback();
  //     }, time);
  // };
  // }

  return (
    <section>
      <h2>Top controls</h2>
      <form action="#" onSubmit={handleClick}>
        <input
          type="search"
          name="search"
          id="search"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
