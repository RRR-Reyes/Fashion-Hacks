import { useState } from "react";

export default function ColorPalette({ colors }) {

  const [copied, setCopied] = useState(null);

  if (!colors) {
  return (
    <div className="palette-box">
      <p className="eyebrow">Extracted Color Palette</p>
      <div style={{ height: '44px', background: 'var(--panel)', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Awaiting analysis</span>
      </div>
    </div>
  );
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