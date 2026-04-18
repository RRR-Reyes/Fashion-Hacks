export default function VibeDescription({ vibe }) {
  
    if (!vibe) {
        return <p>Loading...</p>;
    }
    return (
    <div className="vibe-box">
      <h3>Vibe</h3>
      <p>{vibe}</p>
    </div>
  );
}