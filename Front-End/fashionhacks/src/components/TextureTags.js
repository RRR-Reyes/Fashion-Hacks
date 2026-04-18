export default function TextureTags({ textures }) {
  
  if (!textures) {
    return <p>Loading...</p>;
  }

    return (
    <div className="texture-box">
      <h3>Textures</h3>
      <div className="texture-row">
        {textures.map((t, i) => (
          <span key={i} className="texture-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}