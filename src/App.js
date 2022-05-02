import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CharacterGrid from "./Components/CharacterGrid";
import CharacterCard from "./Components/CharacterCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CharacterDetails from "./Components/CharacterDetails";
import Navbar from "./Components/Navbar";

const App = () => {
  let [fetchedData, setFetchedData] = useState([]);

  let api = `https://rickandmortyapi.com/api/character/`;
  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setFetchedData(data.results);
    })();
  }, [api]);

  return (
    <>
      <Navbar />
      <div className="cardContainer">
        <Routes>
          <Route
            exact
            path="/"
            element={<CharacterGrid results={fetchedData} />}
          />
          <Route exact path="/:id" element={<CharacterDetails />} />
        </Routes>
      </div>
      {/* <CharacterCard /> */}
    </>
  );
};

export default App;
