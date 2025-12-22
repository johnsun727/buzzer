import redButton from "../assets/red_button.png";

export default function Button({ onBuzz, disabled }) {
  function handleClick() {
    if (disabled) return;
    onBuzz?.();
  }

  return (
    <img
      src={redButton}
      alt="Buzz"
      onClick={handleClick}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
        maxWidth: "320px",
        width: "70vw",
      }}
    />
  );
}
