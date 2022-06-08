const Square = ({color, index}) => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 0,2 L 98,2 L 98,98 L 2,98 L 2,4"
        stroke={`${color}60`}
        strokeWidth="14"
        fillOpacity="0"
        strokeDashoffset={0}
      ></path>
      <path
        id={`hud-${index}`}
        d="M 0,2 L 98,2 L 98,98 L 2,98 L 2,4"
        stroke={color}
        strokeWidth="14"
        fillOpacity="0"
        style={{strokeDashoffset: 384, strokeDasharray: '384, 384'}}
      ></path>
    </svg>
  );
};

export default Square;