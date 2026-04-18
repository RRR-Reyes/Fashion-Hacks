const NASA_BASE_URL = import.meta.env.VITE_NASA_API;
const AI_BASE_URL = import.meta.env.VITE_AI_API;

const NASA_URL = `${NASA_BASE_URL}/nasa/image`;
const ANALYZE_URL = `${AI_BASE_URL}/analyze`;
const FASHION_URL = `${AI_BASE_URL}/fashion`;

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

export const getNasaImage = async () => request(NASA_URL);

export const analyzeImage = async (imageUrl) =>
  request(ANALYZE_URL, {
    method: 'POST',
    body: JSON.stringify({ imageUrl }),
  });

export const getFashion = async (data) =>
  request(FASHION_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
