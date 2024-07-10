import React from "react";
import CreateGame from "./CreateGame";
import ListGame from "./ListGame";

const CreateGamePage: React.FC = () => (
  <div className="grid grid-cols-5 gap-5">
    <CreateGame />
    <ListGame />
  </div>
);

export default CreateGamePage;
