export default function NasaImage({ data }) {
    
    if (!data) {
        return <p>Loading...</p>;
    }
    return (
    <div className="nasa-section">
      <img src={data.imageUrl} alt={data.title} className="nasa-img" />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
}