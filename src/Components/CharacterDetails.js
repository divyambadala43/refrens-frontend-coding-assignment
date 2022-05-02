import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EpisodesList from "./EpisodesList";

// The character’s picture
// The character’s information (name, species, gender, etc.)
// Origin and current location (name, dimension, amount of residents, etc.) -> important
// Name of the chapters the character is featured in -> important

const CharacterDetails = () => {
  let [fetchedData, updateFetchedData] = useState({});
  let [locationData, updateLocationData] = useState({});
  let [episodeData, updateEpisodeData] = useState([]);
  const { id } = useParams();

  const { name, image, species, origin, location, status, gender } =
    fetchedData;

  useEffect(() => {
    const api = `https://rickandmortyapi.com/api/character/${id}`;
    (async function () {
      let data = await fetch(api)
        .then((res) => res.json())
        .catch((err) => console.error(err));
      updateFetchedData(data);
      const URL = data.location.url;
      let lData = await fetch(URL)
        .then((res) => res.json())
        .catch((err) => console.error(err));
      updateLocationData(lData);

      const listOfEpisodes = data.episode;
      const eData = await Promise.all(
        listOfEpisodes.map(async (episode) => {
          return await fetch(episode)
            .then((res) => res.json())
            .catch((err) => console.error(err));
        })
      );
      const episodesNames = eData.map((e) => e.name);
      updateEpisodeData(episodesNames);
    })();
  }, []);

  if (Object.keys(locationData).length !== 0) {
    // to check if the object is empty
    const locationName = locationData.name;
    const dimensions = locationData.dimensions;
    const amountOfResidents = locationData.residents.length;
    console.log(locationName);
  }
  console.log(locationData);
  return (
    <div className="characterDetails">
      <div className="characterDetailsCard">
        {Object.keys(fetchedData).length !== 0 && (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                {species} - {gender}
              </Card.Text>
              <Card.Text>Origin - {origin.name}</Card.Text>
              <Card.Text>Current Location - {location.name}</Card.Text>
            </Card.Body>
          </Card>
        )}
        <EpisodesList episodes={episodeData} />
      </div>
      {Object.keys(locationData).length !== 0 && (
        <Card style={{ width: "18rem", height: "20rem" }} className="mb-2">
          <Card.Header>Location Details</Card.Header>
          <Card.Body>
            <Card.Title>{locationData.name}</Card.Title>
            <Card.Text>Dimensions: {locationData.dimension}</Card.Text>
            <Card.Text>
              Amount of Residents: {locationData.residents.length}
            </Card.Text>
            <Card.Text>Type: {locationData.type}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CharacterDetails;
