// import Point from "./point";

// class Points {
//   points: Point[];
//   constructor() {
//     this.points = [];
//     global.exports("points", this);

//     setInterval(() => {
//       let coords: any = GetEntityCoords(PlayerPedId(), true);
//       this.points.forEach((point) => {
//         console.log(
//           GetDistanceBetweenCoords(
//             point.coords.x,
//             point.coords.y,
//             point.coords.z,
//             coords.x,
//             coords.y,
//             coords.z,
//             true
//           )
//         );
//         if (
//           GetDistanceBetweenCoords(
//             point.coords.x,
//             point.coords.y,
//             point.coords.z,
//             coords.x,
//             coords.y,
//             coords.z,
//             true
//           ) <= point.distance
//         ) {
//           point.onEnter();
//         } else {
//           point.onExit();
//         }
//       });
//     }, 200);
//   }

//   new(point: Point) {
//     let self: any = {};
//     self.id = this.points.length + 1;
//     self.coords = point.coords;
//     self.distance = point.distance;
//     self.remove = this.remove;
//     self.onEnter = point.onEnter;
//     self.onExit = point.onExit;

//     this.points.push(self);

//     return self;
//   }

//   remove(id: number) {
//     this.points = this.points.filter((point) => point.id != id);
//   }

//   closest(Coords: Vector3) {
//     let closest: any = {};
//     let closestDistance = 99999;
//     this.points.forEach((point) => {
//       let distance = GetDistanceBetweenCoords(
//         point.coords.x,
//         point.coords.y,
//         point.coords.z,
//         Coords.x,
//         Coords.y,
//         Coords.z,
//         true
//       );
//       if (distance < closestDistance) {
//         closest = point;
//         closestDistance = distance;
//       }
//     });
//     return closest;
//   }
// }

// export default new Points();
export default {}