export default function NasaImage({ data, isLoading, onGenerate, step }) {

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const stepStyle = (n) => step >= n
    ? { color: 'var(--accent)', borderColor: 'rgba(102,153,255,.4)' }
    : {};

  return (
    <div className="nasa-section">
      <p className="eyebrow">Today's NASA Image</p>

      <div className="img-frame">
        {data ? (
          <img src={data.imageUrl} alt={data.title} className="nasa-img" />
        ) : (
          <div className="img-placeholder" />
        )}
        <div className="img-gradient" />
        <div className="live-badge">
          <span className="pulse-dot" />
          NASA APOD Live
        </div>
        {data && (
          <div className="img-caption">
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        )}
      </div>

      <div className="meta-row">
        <div className="meta-cell">
          <div className="meta-label">Source</div>
          <div className="meta-val">NASA APOD</div>
        </div>
        <div className="meta-cell">
          <div className="meta-label">Date</div>
          <div className="meta-val">{today}</div>
        </div>
        <div className="meta-cell">
          <div className="meta-label">AI Model</div>
          <div className="meta-val">GPT-4o</div>
        </div>
      </div>

      <button
        className={`gen-btn ${isLoading ? 'loading' : ''}`}
        onClick={onGenerate}
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing cosmos...' : 'Generate My Cosmic Look →'}
        <div className="loading-line" />
      </button>

      <div className="step-row">
        <div className="step" style={stepStyle(1)}>
          <span className="step-dot" />
          NASA fetched
        </div>
        <div className="step" style={stepStyle(2)}>
          <span className="step-dot" />
          AI analyzing
        </div>
        <div className="step" style={stepStyle(3)}>
          <span className="step-dot" />
          Outfits matched
        </div>
      </div>

    </div>
  );
}