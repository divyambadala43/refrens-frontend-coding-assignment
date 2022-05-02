import React from "react";
import { Link } from "react-router-dom";

const CharacterGrid = ({ results }) => {
  let characters = results.map((character) => {
    return (
      <div key={character.id} className="card" style={{ width: "18rem" }}>
        <img src={character.image} className="card-img-top" alt="character" />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {character.species} - {character.gender}
          </h6>
          <p className="card-text">Origin - {character.origin.name}</p>
          <p className="card-text">
            Current Location - {character.location.name}
          </p>
          <p className="card-text"></p>
          <Link to={`/${character.id}`} className="btn mr-2">
            Show Details
          </Link>
        </div>
      </div>
    );
  });
  return <>{characters}</>;
};

export default CharacterGrid;
