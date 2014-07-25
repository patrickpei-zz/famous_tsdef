/// <reference path='../core/Common.d.ts' />

declare module "famous/math/Matrix" {
    import Vector = require('famous/math/Vector');

    /**
     * A library for using a 3x3 numerical matrix, represented as a two-level array.
     */
    class Matrix{
        
        /**
         * A library for using a 3x3 numerical matrix, represented as a two-level array.
         * @param {Array.Array} values array of rows
         */
        constructor (values?: number[][]);
        /**
         * Return the values in the matrix as an array of numerical row arrays
         */
        get(): number[][];
    
        /**
         * Set the nested array of rows in the matrix.
         */
        set(values: number[][]): void;
    
        /**
         * Take this matrix as A, input vector V as a column vector, and return matrix product (A)(V).
         *   Note: This sets the internal vector register.  Current handles to the vector register
         *   will see values changed.
         *
         * @method vectorMultiply
         *
         * @param {Vector} v input vector V
         * @return {Vector} result of multiplication, as a handle to the internal vector register
         */
        vectorMultiply(v: Vector): Vector;
    
        /**
         * Multiply the provided matrix M2 with this matrix.  Result is (this) * (M2).
         *   Note: This sets the internal matrix register.  Current handles to the register
         *   will see values changed.
         */
        multiply(M2: Matrix): Matrix;
    
        /**
         * Creates a Matrix which is the transpose of this matrix.
         *   Note: This sets the internal matrix register.  Current handles to the register
         *   will see values changed.
         *
         * @method transpose
         *
         * @return {Matrix} result of transpose, as a handle to the internal register
         */
        transpose(): Matrix;
    
        /**
         * Clones the matrix
         */
        clone(): Matrix;
    }
    
    export = Matrix;
}

