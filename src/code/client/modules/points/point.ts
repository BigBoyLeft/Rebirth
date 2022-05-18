class Point {
  id: number;
  coords: Vector3;
  distance: number;
  onEnter: Function;
  onExit: Function;

  constructor({
    id,
    coords,
    distance,
    onEnter = () => {},
    onExit = () => {},
  }: {
    id: number;
    coords: Vector3;
    distance: number;
    onEnter: Function;
    onExit: Function;
  }) {
    this.id = id;
    this.coords = coords;
    this.distance = distance;
    this.onEnter = onEnter;
    this.onExit = onExit;
  }
}

export default Point;
