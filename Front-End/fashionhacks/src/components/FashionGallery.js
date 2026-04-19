const LOOK_LABELS = ['Nebula', 'Orbit', 'Stellar', 'Void', 'Aurora'];

export default function FashionGallery({ items }) {

  if (!items) {
    return <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Loading...</p>;
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