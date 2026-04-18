import React from 'react';

function ColorPalette({ colors }) {
  if (!colors || !Array.isArray(colors)) return null;

  return (
    <div style={{ margin: '20px auto' }}>
      <h3>Extracted Palette</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {colors.map((color, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <div 
              style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: color, 
                borderRadius: '50%',
                border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }} 
            />
            <span style={{ fontSize: '0.8rem' }}>{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPalette;
