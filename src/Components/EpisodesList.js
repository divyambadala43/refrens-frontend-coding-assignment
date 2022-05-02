import { Dropdown, DropdownButton } from "react-bootstrap";
import React from "react";

const EpisodesList = ({ episodes }) => {
  //   console.log(episodes);
  const episodesList = episodes.map((episode, index) => {
    return (
      <Dropdown.Item key={index} href="#/action-1">
        {episode}
      </Dropdown.Item>
    );
  });
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Episodes character featured in">
      {episodesList}
    </DropdownButton>
  );
};

export default EpisodesList;
