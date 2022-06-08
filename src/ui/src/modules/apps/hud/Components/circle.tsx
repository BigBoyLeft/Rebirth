const Circle = ({ color, index }) => {
  return (
    <svg style={{transform: "rotate(-90deg)"}} viewBox="0 0 100 100" >
      <circle
        r="45"
        cx="50"
        cy="50"
        stroke={`${color}60`}
        strokeWidth="10"
        fillOpacity="0"
        ></circle>
      <circle
        id={`hud-${index}`}
        r="45"
        cx="50"
        cy="50"
        stroke={color}
        strokeWidth="10"
        fillOpacity="0"
        style={{strokeDashoffset: 384, strokeDasharray: '384, 384'}}
      ></circle>
    </svg>
  );
};

export default Circle;
