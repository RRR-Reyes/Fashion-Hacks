export default function FashionGallery({ items }) {
  
    if (!items) {
    return <p>Loading...</p>;
}
    return (
    <div className="gallery-box">
      <h3>Fashion Gallery</h3>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <img key={i} src={item.imageUrl} alt="fit" className="gallery-img" />
        ))}
      </div>
    </div>
  );
}