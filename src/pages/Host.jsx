import { useEffect, useRef, useState } from "react";
import Ably from "ably";
import buzzerSound from "../assets/buzzer.mp3";

const client = new Ably.Realtime(import.meta.env.VITE_ABLY_KEY);
const CHANNEL_NAME = "room:default";

export default function Host() {
  const [lockedTeam, setLockedTeam] = useState(null);

  const channelRef = useRef(null);
  const audioRef = useRef(new Audio(buzzerSound));

  useEffect(() => {
    const channel = client.channels.get(CHANNEL_NAME);
    channelRef.current = channel;

    channel.subscribe("buzz", (msg) => {
      setLockedTeam((current) => {
        if (current) return current; // already locked

        const firstTeam = msg.data.teamName;

        // lock everyone
        channel.publish("locked", { teamName: firstTeam, at: Date.now() });

        // play ONE buzz on host machine
        audioRef.current.currentTime = 0;
        audioRef.current.play();

        return firstTeam;
      });
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  function handleReset() {
    setLockedTeam(null);
    channelRef.current.publish("reset", { at: Date.now() });
  }

  return (
    <div className="page">
      <h1 className="title">HOST</h1>

      <h2 className="status">First buzz: {lockedTeam ?? "—"}</h2>

      <button className="host-reset" onClick={handleReset}>
        Reset
      </button>

    </div>
  );
}
