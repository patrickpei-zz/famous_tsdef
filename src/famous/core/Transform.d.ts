/// <reference path='Common.d.ts' />

declare module fms {
    
    interface ITransformSpec {
        translate: Vector3;
        rotate: Vector3;
        scale: Vector3;
        skew: Vector3;
    }
    
    interface ITransform {
        precision: number;  
        identity :Matrix4x4;
        /**
         * Multiply two or more Transform matrix types to return a Transform matrix.
         */
        multiply4x4(a:Matrix4x4, b:Matrix4x4): Matrix4x4;
        /**
         * Fast-multiply two or more Transform matrix types to return a
         *    Matrix, assuming bottom row on each is [0 0 0 1].
         */
        multiply(a:Matrix4x4, b:Matrix4x4): Matrix4x4;
        /**
         * Return a Transform translated by additional amounts in each
         *    dimension. This is equivalent to the result of
         *
         * @param {Array.Number} t floats delta vector of length 2 or 3
         * @return {Transform} the resulting translated matrix
         */
        thenMove(m:Matrix4x4, t:Vector3): Matrix4x4;
        /**
         * Return a Transform atrix which represents the result of a transform matrix
         *    applied after a move. This is faster than the equivalent multiply.
         *    This is equivalent to the result of:
         *
         *    Transform.multiply(m, Transform.translate(t[0], t[1], t[2])).
         *
         */
        moveThen(v:Vector3, m:Matrix4x4):Matrix4x4;
    
        /**
         * Return a Transform which represents a translation by specified
         *    amounts in each dimension.
         *
         */
        translate(x:number, y:number, z:number):Matrix4x4;
    
        /**
         * Return a Transform scaled by a vector in each
         *    dimension. This is a more performant equivalent to the result of
         *
         *    Transform.multiply(Transform.scale(s[0], s[1], s[2]), m).
         *
         */
        thenScale(m:Matrix4x4, s:Vector3) : Matrix4x4;
    
        /**
         * Return a Transform which represents a scale by specified amounts
         *    in each dimension.
         */
        scale(x:number, y:number, z:number):Matrix4x4;
    
        /**
         * Return a Transform which represents a clockwise
         *    rotation around the x axis.
         */
        rotateX(theta: number):Matrix4x4;
    
        /**
         * Return a Transform which represents a clockwise
         *    rotation around the y axis.
         */
         rotateY(theta: number):Matrix4x4;
    
        /**
         * Return a Transform which represents a clockwise
         *    rotation around the z axis.
         *
         */
         rotateZ(theta: number):Matrix4x4;
    
        /**
         * Return a Transform which represents composed clockwise
         *    rotations along each of the axes. Equivalent to the result of
         *    Matrix.multiply(rotateX(phi), rotateY(theta), rotateZ(psi)).
         */
        rotate(phi:number, theta:number, psi:number):Matrix4x4;
        /**
         * Return a Transform which represents an axis-angle rotation
         *
         * @method rotateAxis
         * @static
         * @param {Array.Number} v unit vector representing the axis to rotate about
         * @param {Number} theta radians to rotate clockwise about the axis
         * @return {Transform} the resulting matrix
         */
        rotateAxis(v:Vector3, theta:number):Matrix4x4;
    
        /**
         * Return a Transform which represents a transform matrix applied about
         * a separate origin point.
         *
         * @method aboutOrigin
         * @static
         * @param {Array.Number} v origin point to apply matrix
         * @param {Transform} m matrix to apply
         * @return {Transform} the resulting matrix
         */
        aboutOrigin(v:Vector3, m:Matrix4x4):Matrix4x4; 
    
        /**
         * Return a Transform representation of a skew transformation
         *
         */
        skew(phi:number, theta:number, psi:number):Matrix4x4;
    
        /**
         * Returns a perspective Transform matrix
         *
         * @method perspective
         * @static
         * @param {Number} focusZ z position of focal point
         * @return {Transform} the resulting matrix
         */
        perspective(focusZ:number):Matrix4x4;
    
        /**
         * Return translation vector component of given Transform
         *
         * @method getTranslate
         * @static
         * @param {Transform} m matrix
         * @return {Array.Number} the translation vector [t_x, t_y, t_z]
         */
        getTranslate(m:Matrix4x4):Vector3;
    
        /**
         * Return inverse affine matrix for given Transform.
         *   Note: This assumes m[3] = m[7] = m[11] = 0, and m[15] = 1.
         *   Will provide incorrect results if not invertible or preconditions not met.
         *
         */
        inverse(m:Matrix4x4):Matrix4x4;
        /**
         * Returns the transpose of a 4x4 matrix
         *
         */
        transpose(m:Matrix4x4):Matrix4x4;
        
        /**
         * Decompose Transform into separate .translate, .rotate, .scale,
         *    and .skew components.
         *
         */
        interpret(M:Matrix4x4):ITransformSpec
    
    
    
        /**
         * Weighted average between two matrices by averaging their
         *     translation, rotation, scale, skew components.
         *     f(M1,M2,t) = (1 - t) * M1 + t * M2
         *
         */
        average(M1:Matrix4x4, M2:Matrix4x4, t:number):Matrix4x4;
    
        /**
         * Compose .translate, .rotate, .scale, .skew components into
         * Transform matrix
         */
        build(spec:ITransformSpec):Matrix4x4;
    
        /**
         * Determine if two Transforms are component-wise equal
         *   Warning: breaks on perspective Transforms
         *
         */
        equals(a:Matrix4x4, b:Matrix4x4):boolean;
    
        /**
         * Determine if two Transforms are component-wise unequal
         *   Warning: breaks on perspective Transforms
         */
        notEquals(a:Matrix4x4, b:Matrix4x4):boolean;
    
        /**
         * Constrain angle-trio components to range of [-pi, pi).
         *
         * @method normalizeRotation
         * @static
         * @param {Array.Number} rotation phi, theta, psi (array of floats
         *    && array.length == 3)
         * @return {Array.Number} new phi, theta, psi triplet
         *    (array of floats && array.length == 3)
         */
        normalizeRotation(rotation:Vector3):Vector3;
    
        /**
         * (Property) Array defining a translation forward in z by 1
         */
        inFront:Matrix4x4;
    
        /**
         * (Property) Array defining a translation backwards in z by 1
         */
        behind:Matrix4x4;
    
    }
}
declare var Transform : fms.ITransform;
declare module "famous/core/Transform" {
   export = Transform;
}

