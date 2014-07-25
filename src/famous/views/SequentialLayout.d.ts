/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='../utilities/Utility.d.ts' />



declare module fms {
    interface SequentialLayoutOptions{
        direction: number;
        itemSpacing?: number;
        defaultItemSize?:Size;
        
    }
    
    interface SequentialLayoutOutputResult{
        /** a transform matrix */
        transform: fms.Matrix4x4;
        /** the result of render method */
        target: fms.IRenderSpec;
    }
}

declare module "famous/views/SequentialLayout" {

    /**
     * SequentialLayout will lay out a collection of renderables sequentially in the specified direction.
     */
    class SequentialLayout<T extends fms.IRenderable> implements fms.IRenderable, fms.ISequenceView<T>{
        static DEFAULT_OPTIONS: fms.SequentialLayoutOptions;
        constructor  (options?: fms.SequentialLayoutOptions);
            
        /**
         * Patches the SequentialLayout instance's options with the passed-in ones.
         */
        setOptions (options: fms.SequentialLayoutOptions): SequentialLayout<T>;
        
        /** setOutputFunction is used to apply a user-defined output transform on each processed renderable.
         *  For a good example, check out SequentialLayout's own DEFAULT_OUTPUT_FUNCTION in the code.
         *
         * @param {Function} outputFunction An output processer for each renderable in the SequentialLayout
         * instance.
         */
        setOutputFunction (outputFunction: (input: T, position:number, index:number)=> fms.SequentialLayoutOutputResult): SequentialLayout<T>;
        
        /**
         * Sets the collection of renderables under the SequentialLayout instance's control.
         *
         * @method sequenceFrom
         * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous viewSequence.
         */
        sequenceFrom (renderables: T[]): void;
        
        getSize(): fms.Size;
    
        render() : fms.IRenderSpec;
    }

    export = SequentialLayout;
}
