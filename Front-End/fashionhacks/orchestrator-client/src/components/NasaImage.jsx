import React from 'react';

function NasaImage({ data }) {
  if (!data) return null;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h3>Cosmic Inspiration</h3>
      <img 
        src={data.url} 
        alt={data.title} 
        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
      />
      <p><i>{data.title}</i></p>
    </div>
  );
}

export default NasaImage;
