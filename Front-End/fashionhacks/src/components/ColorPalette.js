import { useState } from "react";

export default function ColorPalette({ colors }) {

  const [copied, setCopied] = useState(null);

  if (!colors) {
    return <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Loading...</p>;
  }

  function handleCopy(hex) {
    navigator.clipboard?.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="palette-box">
      <p className="eyebrow">Extracted Color Palette</p>
      <div className="palette-row">
        {colors.map((c, i) => (
          <div key={i} className="color-swatch" onClick={() => handleCopy(c)}>
            <div className="swatch-color" style={{ background: c }} />
            <div className="swatch-hex">
              {copied === c ? 'Copied!' : c}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}