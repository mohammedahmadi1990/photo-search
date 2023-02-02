import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import { Gallery } from "./components/Gallery/Gallery";

function App() {
  const [query, setQuery] = useState();
  return (
    <div>
      <Header query={query} setQuery={setQuery} />
      <Gallery query={query} />
    </div>
  );
}

export default App;
