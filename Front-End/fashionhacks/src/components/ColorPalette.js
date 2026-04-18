export default function ColorPalette({ colors }) {
  
  if (!colors) {
    return <p>Loading...</p>;
  }

    return (
    <div className="palette-box">
      <h3>Color Palette</h3>
      <div className="palette-row">
        {colors.map((c, i) => (
          <div key={i} className="color-swatch" style={{ background: c }}>
            <span>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );

}