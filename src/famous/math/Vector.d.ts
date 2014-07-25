/// <reference path='../core/Common.d.ts' />

declare module fms { 
    module math{
        export interface Vector{
            /**
             * Add this element-wise to another Vector, element-wise.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @param {Vector} v addend
             * @return {Vector} vector sum
             */
            add(v: fms.math.Vector): fms.math.Vector;
        
            /**
             * Subtract another vector from this vector, element-wise.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @param {Vector} v subtrahend
             */
            sub(v: fms.math.Vector): fms.math.Vector;
        
            /**
             * Scale Vector by floating point r.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method mult
             *
             * @param {number} r scalar
             * @return {Vector} vector result
             */
            mult(r: number): fms.math.Vector;
        
            /**
             * Scale Vector by floating point 1/r.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method div
             *
             * @param {number} r scalar
             * @return {Vector} vector result
             */
            div(r: number): fms.math.Vector;
        
            /**
             * Given another vector v, return cross product (v)x(this).
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method cross
             * @param {Vector} v Left Hand Vector
             * @return {Vector} vector result
             */
            cross(v: fms.math.Vector): fms.math.Vector;
            /**
             * Component-wise equality test between this and Vector v.
             * @method equals
             * @param {Vector} v vector to compare
             * @return {boolean}
             */
            equals(v: fms.math.Vector): boolean;
        
            /**
             * Rotate clockwise around x-axis by theta radians.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method rotateX
             * @param {number} theta radians
             * @return {Vector} rotated vector
             */
            rotateX(theta: number): fms.math.Vector;
            /**
             * Rotate clockwise around y-axis by theta radians.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method rotateY
             * @param {number} theta radians
             * @return {Vector} rotated vector
             */
            rotateY(theta: number): fms.math.Vector;
        
            /**
             * Rotate clockwise around z-axis by theta radians.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method rotateZ
             * @param {number} theta radians
             * @return {Vector} rotated vector
             */
            rotateZ(theta: number): fms.math.Vector;
        
            /**
             * Return dot product of this with a second Vector
             * @method dot
             * @param {Vector} v second vector
             * @return {number} dot product
             */
            dot(v: fms.math.Vector): number;
        
            /**
             * Return squared length of this vector
             * @method normSquared
             * @return {number} squared length
             */
            normSquared(): number;
        
            /**
             * Return length of this vector
             * @method norm
             * @return {number} length
             */
            norm(): number;
        
            /**
             * Scale Vector to specified length.
             *   If length is less than internal tolerance, set vector to [length, 0, 0].
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method normalize
             *
             * @param {number} length target length, default 1.0
             * @return {Vector}
             */
            normalize(length?: number): fms.math.Vector;
            /**
             * Make a separate copy of the Vector.
             * @method clone
             * @return {Vector}
             */
            clone(): fms.math.Vector;
            /**
             * True if and only if every value is 0 (or falsy)
             *
             * @method isZero
             *
             * @return {boolean}
             */
            isZero(): boolean;
        
        
        
            /**
             * Set this Vector to the values in the provided Array or Vector.
             *
             * @method set
             * @param {object} v array, Vector, or number
             * @return {Vector} this
             */
            set(v: fms.Vector3): fms.math.Vector;
            set(v: fms.math.Vector): fms.math.Vector;
            set(n: number): fms.math.Vector;
        
            /**
             * Put result of last internal register calculation in specified output vector.
             *
             * @method put
             * @param {Vector} v destination vector
             * @return {Vector} destination vector
             */
        
            put(v: fms.math.Vector): fms.math.Vector;
        
            /**
             * Set this vector to [0,0,0]
             *
             * @method clear
             */
            clear(): void;
        
            /**
             * Scale this Vector down to specified "cap" length.
             *   If Vector shorter than cap, or cap is Infinity, do nothing.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method cap
             * @return {Vector} capped vector
             */
            cap(cap: number): fms.math.Vector;
        
            /**
             * Return projection of this Vector onto another.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method project
             * @param {Vector} n vector to project upon
             * @return {Vector} projected vector
             */
            project(n: fms.math.Vector): fms.math.Vector;
        
            /**
             * Reflect this Vector across provided vector.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method reflectAcross
             * @param {Vector} n vector to reflect across
             * @return {Vector} reflected vector
             */
            reflectAcross(n: fms.math.Vector): fms.math.Vector;
        
            /**
             * Convert Vector to three-element array.
             *
             * @method get
             * @return {array<number>} three-element array
             */
            get(): fms.Vector3;
        
            get1D(): number;
        }
    }
    interface IPositioned {
        position: fms.math.Vector;
    }
}
declare module "famous/math/Vector" {

    class Vector implements fms.math.Vector{
        /**
         * Three-element floating point vector.
         *
         * @class Vector
         * @constructor
         */
        constructor (x: number, y: number, z: number );
    
        /**
         * Add this element-wise to another Vector, element-wise.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @param {Vector} v addend
         * @return {Vector} vector sum
         */
        add(v: Vector): Vector;
    
        /**
         * Subtract another vector from this vector, element-wise.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @param {Vector} v subtrahend
         */
        sub(v: Vector): Vector;
    
        /**
         * Scale Vector by floating point r.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method mult
         *
         * @param {number} r scalar
         * @return {Vector} vector result
         */
        mult(r: number): Vector;
    
        /**
         * Scale Vector by floating point 1/r.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method div
         *
         * @param {number} r scalar
         * @return {Vector} vector result
         */
        div(r: number): Vector;
    
        /**
         * Given another vector v, return cross product (v)x(this).
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method cross
         * @param {Vector} v Left Hand Vector
         * @return {Vector} vector result
         */
        cross(v: Vector): Vector;
        /**
         * Component-wise equality test between this and Vector v.
         * @method equals
         * @param {Vector} v vector to compare
         * @return {boolean}
         */
        equals(v: Vector): boolean;
    
        /**
         * Rotate clockwise around x-axis by theta radians.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method rotateX
         * @param {number} theta radians
         * @return {Vector} rotated vector
         */
        rotateX(theta: number): Vector;
        /**
         * Rotate clockwise around y-axis by theta radians.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method rotateY
         * @param {number} theta radians
         * @return {Vector} rotated vector
         */
        rotateY(theta: number): Vector;
    
        /**
         * Rotate clockwise around z-axis by theta radians.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method rotateZ
         * @param {number} theta radians
         * @return {Vector} rotated vector
         */
        rotateZ(theta: number): Vector;
    
        /**
         * Return dot product of this with a second Vector
         * @method dot
         * @param {Vector} v second vector
         * @return {number} dot product
         */
        dot(v: Vector): number;
    
        /**
         * Return squared length of this vector
         * @method normSquared
         * @return {number} squared length
         */
        normSquared(): number;
    
        /**
         * Return length of this vector
         * @method norm
         * @return {number} length
         */
        norm(): number;
    
        /**
         * Scale Vector to specified length.
         *   If length is less than internal tolerance, set vector to [length, 0, 0].
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method normalize
         *
         * @param {number} length target length, default 1.0
         * @return {Vector}
         */
        normalize(length?: number): Vector;
        /**
         * Make a separate copy of the Vector.
         * @method clone
         * @return {Vector}
         */
        clone(): Vector;
        /**
         * True if and only if every value is 0 (or falsy)
         *
         * @method isZero
         *
         * @return {boolean}
         */
        isZero(): boolean;
    
    
    
        /**
         * Set this Vector to the values in the provided Array or Vector.
         *
         * @method set
         * @param {object} v array, Vector, or number
         * @return {Vector} this
         */
        set(v: fms.Vector3): Vector;
        set(v: Vector): Vector;
        set(n: number): Vector;
    
        /**
         * Put result of last internal register calculation in specified output vector.
         *
         * @method put
         * @param {Vector} v destination vector
         * @return {Vector} destination vector
         */
    
        put(v: Vector): Vector;
    
        /**
         * Set this vector to [0,0,0]
         *
         * @method clear
         */
        clear(): void;
    
        /**
         * Scale this Vector down to specified "cap" length.
         *   If Vector shorter than cap, or cap is Infinity, do nothing.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method cap
         * @return {Vector} capped vector
         */
        cap(cap: number): Vector;
    
        /**
         * Return projection of this Vector onto another.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method project
         * @param {Vector} n vector to project upon
         * @return {Vector} projected vector
         */
        project(n: Vector): Vector;
    
        /**
         * Reflect this Vector across provided vector.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method reflectAcross
         * @param {Vector} n vector to reflect across
         * @return {Vector} reflected vector
         */
        reflectAcross(n: Vector): Vector;
    
        /**
         * Convert Vector to three-element array.
         *
         * @method get
         * @return {array<number>} three-element array
         */
        get(): fms.Vector3;
    
        get1D(): number;
    }

    export = Vector;
}

