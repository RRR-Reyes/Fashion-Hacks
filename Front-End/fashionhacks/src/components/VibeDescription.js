export default function VibeDescription({ vibe }) {

  if (!vibe) {
  return (
    <div className="vibe-box">
      <p className="eyebrow">Cosmic Vibe</p>
      <div className="vibe-block">
        <p style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
          Click generate to analyze today's NASA image...
        </p>
      </div>
    </div>
  );
}
}