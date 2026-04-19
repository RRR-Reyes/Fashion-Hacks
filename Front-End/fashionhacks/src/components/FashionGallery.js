const LOOK_LABELS = ['Nebula', 'Orbit', 'Stellar', 'Void', 'Aurora'];

export default function FashionGallery({ items }) {

  if (!items) {
  return (
    <div className="gallery-box">
      <p className="eyebrow">Outfit Curation</p>
      <div className="gallery-grid">
        {[1, 2, 3].map(i => (
          <div key={i} className="gallery-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Look {String(i).padStart(2,'0')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="gallery-box">
      <p className="eyebrow">Outfit Curation — {items.length} Looks</p>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <div key={i} className="gallery-item">
            <img
              src={item.imageUrl}
              alt={`Look ${i + 1}`}
              className="gallery-img"
            />
            <div className="gallery-overlay">
              <span>Look {String(i + 1).padStart(2, '0')} — {LOOK_LABELS[i] ?? `Style ${i + 1}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}