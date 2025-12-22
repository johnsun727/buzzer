import { useEffect, useRef, useState } from "react";
import Ably from "ably";
import Name from "../components/Name.jsx";
import Button from "../components/Button.jsx";
import christmasGif from '../assets/christmas.gif'

const client = new Ably.Realtime(import.meta.env.VITE_ABLY_KEY);
const CHANNEL_NAME = "room:default";

export default function Play() {
  const [teamName, setTeamName] = useState(null);
  const [locked, setLocked] = useState(false);

  const channelRef = useRef(null);

  useEffect(() => {
    const channel = client.channels.get(CHANNEL_NAME);
    channelRef.current = channel;

    channel.subscribe("locked", () => setLocked(true));
    channel.subscribe("reset", () => setLocked(false));

    return () => {
      channel.unsubscribe();
    };
  }, []);

  function handleBuzz() {
    if (!teamName) return;
    if (locked) return;

    // Players do NOT play sound. Host plays it once.
    channelRef.current.publish("buzz", { teamName, at: Date.now() });
  }

  return (
    <div className="page">
      {!teamName ? (
        <Name onSubmit={setTeamName} />
      ) : (
        <>
          <h1 className="title">
            CHRISTMAS JEOPARDY!
            <br />
            <img src={christmasGif}/>
            <br />
            {teamName}
          </h1>

          <Button onBuzz={handleBuzz} disabled={locked} />

          {locked && <h2 className="status">"A horse gallops with his lungs, perseveres with his heart, and wins with his character." - Federico Tesio</h2>}
        </>
      )}
    </div>
  );
}
