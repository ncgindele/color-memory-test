function ConfidenceSlider(props) {
  return (
    <div className="confidence-slider-container">
      <label htmlFor="confidence-slider">Less Confident&nbsp;</label>
      <input
        type="range"
        id="confidence-slider"
        name="confidence-slider"
        min="0"
        max="100"
        step="1"
        value={props.confidence}
        onChange={props.handleSliderChange}
      />
      <label htmlFor="confidence-slider">&nbsp;More Confident</label>
    </div>
  );
}

export default ConfidenceSlider;
