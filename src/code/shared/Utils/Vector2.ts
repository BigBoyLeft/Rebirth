export class Vector2 implements Vector2 {
    public static create(v1: number | Vector2): Vector2 {
      if (typeof v1 === "number") {
        return new Vector2(v1, v1);
      }
      return new Vector2(v1.num1, v1.num2);
    }
  
    public static clone(v1: Vector2): Vector2 {
      return Vector2.create(v1);
    }
  
    public static add(v1: Vector2, v2: number | Vector2): Vector2 {
      if (typeof v2 === "number") {
        return new Vector2(v1.num1 + v2, v1.num2 + v2);
      }
      return new Vector2(v1.num1 + v2.num1, v1.num2 + v2.num2);
    }
  
    public static subtract(v1: Vector2, v2: Vector2): Vector2 {
      return new Vector2(v1.num1 - v2.num1, v1.num2 - v2.num2);
    }
  
    public static multiply(v1: Vector2, v2: Vector2 | number): Vector2 {
      if (typeof v2 === "number") {
        return new Vector2(v1.num1 * v2, v1.num2 * v2);
      }
      return new Vector2(v1.num1 * v2.num1, v1.num2 * v2.num2);
    }
  
    public static divide(v1: Vector2, v2: Vector2 | number): Vector2 {
      if (typeof v2 === "number") {
        return new Vector2(v1.num1 / v2, v1.num2 / v2);
      }
      return new Vector2(v1.num1 / v2.num1, v1.num2 / v2.num2);
    }
  
    public static dotProduct(v1: Vector2, v2: Vector2): number {
      return v1.num1 * v2.num1 + v1.num2 * v2.num2;
    }
  
    public static normalize(v: Vector2): Vector2 {
      return Vector2.divide(v, v.Length);
    }
  
    constructor(public num1: number, public num2: number) {}
  
    public clone(): Vector2 {
      return new Vector2(this.num1, this.num2);
    }
  
    /**
     * The product of the Euclidean magnitudes of this and another Vector2.
     *
     * @param v Vector2 to find Euclidean magnitude between.
     * @returns Euclidean magnitude with another vector.
     */
    public distanceSquared(v: Vector2): number {
      const w: Vector2 = this.subtract(v);
      return Vector2.dotProduct(w, w);
    }
  
    /**
     * The distance between two Vectors.
     *
     * @param v Vector2 to find distance between.
     * @returns Distance between this and another vector.
     */
    public distance(v: Vector2): number {
      return Math.sqrt(this.distanceSquared(v));
    }
  
    public get normalize(): Vector2 {
      return Vector2.normalize(this);
    }
  
    public dotProduct(v: Vector2): number {
      return Vector2.dotProduct(this, v);
    }
  
    public add(v: number | Vector2): Vector2 {
      return Vector2.add(this, v);
    }
  
    public subtract(v: Vector2): Vector2 {
      return Vector2.subtract(this, v);
    }
  
    public multiply(v: number | Vector2): Vector2 {
      return Vector2.multiply(this, v);
    }
  
    public divide(v: number | Vector2): Vector2 {
      return Vector2.divide(this, v);
    }
  
    public replace(v: Vector2): void {
      this.num1 = v.num1;
      this.num2 = v.num2;
    }
  
    public get Length(): number {
      return Math.sqrt(this.num1 * this.num1 + this.num2 * this.num2);
    }
  }
  
  export default Vector2;