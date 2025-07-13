import { useState } from "react";
import Results from "./components/Results";
import TopControls from "./components/TopControls";
import "./App.css";

function App() {
  const [query, setQuery] = useState(localStorage.getItem("name") || "");

  return (
    <>
      <TopControls onSearch={setQuery} />
      <Results query={query} />
    </>
  );
}

export default App;
