import React from 'react';

function FashionGallery({ results }) {
  if (!results) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left' }}>
      <h3>Your Fashion Gallery</h3>
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <p><strong>Recommended Items:</strong></p>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
}

export default FashionGallery;
