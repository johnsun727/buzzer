import { useState } from "react";

export default function Name({ onSubmit }) {
  const [teamName, setTeamName] = useState("");

  function handleSubmit() {
    if (teamName.trim() === "") return;
    onSubmit(teamName.trim());
  }

  return (
    <section className="name-card">
      <h1 className="title">Enter Your Team Name</h1>

      <input
        className="name-input"
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="e.g., Team Blue"
      />

      <button className="name-submit" onClick={handleSubmit}>
        Submit
      </button>
    </section>
  );
}
