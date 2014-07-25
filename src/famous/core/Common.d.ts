declare module fms {
    interface Align extends Array<number>{}
    interface Origin extends Array<number>{}
    interface Origin3 extends Array<number>{}
    interface Size extends Array<number>{}
    interface Size3 extends Array<number>{}
    interface Range extends Array<number>{}
    interface Dimension extends Array<number>{}
    interface Point2d extends Array<number>{}
    interface Vector3 extends Array<number>{}
    interface Vector4 extends Array<number>{}
    interface Matrix4x4 extends Array<number>{}
    
    interface curveFunction {
        (d: number): number;        
    }
    
    interface INamedTransition{
       duration: number; // duration of the transition
       curve?: string; // definition of a curve
    }
    
    interface IFuncTransition{
       duration: number; // duration of the transition
       curve: curveFunction;
    }
    
    interface ITransition{
       method: string;
       period: number;
       dampingRation?: number;
       velocity?: number
    }
    
    /**
     * IRenderSpec is the result of te render method.
     * IRenderSpec is one of following possibility:
     * - a IRenderSpecElement
     * - a Array of IRenderSpec
     * - a number (id)
     */
    interface IRenderSpec{
    }
    
    interface IRenderSpecElement{
       id?: string;
       target: IRenderSpec;
       opacity?: number;
       transform?: IRenderSpecTransform;
       origin?: Origin;
       spec?: Align;
       size?: Size;
    }

    /**
     * IRenderSpec is the result of te render method.
     * IRenderSpecTransform is one of following possibility:
     * - a fms.Matrix4x4
     * - a Array of IRenderSpecTransformDef
     * - a number (id)
     */
    interface IRenderSpecTransform{
        
    }
    /**
     * IRenderSpecTransformDef is an object with one of the following attribute is set
     */
    interface IRenderSpecTransformDef{
        translate?: fms.Vector3;
        rotate?: number;
        rotateX?: number;
        rotateY?: number;
        rotateZ?: number;
        rotateAxis?: number[];
        scale?: fms.Vector3;
        skew?: fms.Vector3;
        matrix3d?: () => fms.Matrix4x4;
        
    }
    


    
    interface IModifier {
       modify (renderSpec: IRenderSpec): IRenderSpec;
    }
    
    interface IRenderable{
       render (): IRenderSpec;
    }

    interface IValueProvider<T>{
       get (): T;
    }


    /**
     * Sets the collection of renderables under the FlexibleLayout instance's control.
     *
     * @method sequenceFrom
     * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous viewSequence.
     */
    interface ISequenceView<T extends IRenderable>{
        sequenceFrom (renderables: T[]): void;
    }
    
    interface IScalable {
        /** scale factor, 1 or undefined is identity  */
        scale?: number;
    }
    
    interface ITransionable<T> {
        set (state: T, transition?: any, callback? : ()=>void): any;
        reset (state: T): any;
        get (): T;
    }

}
