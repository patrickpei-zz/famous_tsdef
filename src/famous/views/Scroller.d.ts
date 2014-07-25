/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='../utilities/Utility.d.ts' />
/// <reference path='./Scrollview.d.ts' />


declare module fms {
    interface IScrollerOptions{
        /** direction : Utility.Direction.Y  Using the direction helper found in the famous Utility
         * module, this option will lay out the Scroller instance's renderables either horizontally
         * (x) or vertically (y). Utility's direction is essentially either zero (X) or one (Y) */
        direction?: number;
         /** clipSize=undefined The size of the area (in pixels) that Scroller will display content in. */
        clipSize?: number;
         /** margin=undefined The size of the area (in pixels) that Scroller will process renderables' associated calculations in. */
        margin?: number;
    }
}

declare module "famous/views/Scroller" {

    import EventHandler = require('famous/core/EventHandler');
    import ViewSequence = require('famous/core/ViewSequence');

    //  EventHandler is mixed in
    /**
     * Scroller lays out a collection of renderables, and will browse through them based on
     * accessed position. Scroller also broadcasts an 'edgeHit' event, with a position property of the location of the edge,
     * when you've hit the 'edges' of it's renderable collection.
     */
    class Scroller<T extends fms.IRenderable>  extends EventHandler implements fms.IRenderable, fms.ISequenceView<T>{
        static DEFAULT_OPTIONS: fms.IScrollerOptions;
    
        
         options: fms.IScrollerOptions;
         _node: ViewSequence<T>;
         // used for shifting nodes
         _positionOffset: number;
    
         _onEdge: number; // -1 for top, 1 for bottom
    
         _eventInput: EventHandler;
         _eventOutput: EventHandler;
    
    
    
        constructor  (options?: fms.IScrollviewOptions);
            /**
         * Patches the Scroller instance's options with the passed-in ones.
         * @method setOptions
         * @param {Options} options An object of configurable options for the Scroller instance.
         */
        setOptions(options?: fms.IScrollviewOptions): void;
        /**
         * Tells you if the Scroller instance is on an edge.
         * @method onEdge
         * @return {Boolean} Whether the Scroller instance is on an edge or not.
         */
        onEdge(): boolean;
    
        /**
         * Allows you to overwrite the way Scroller lays out it's renderables. Scroller will
         * pass an offset into the function. By default the Scroller instance just translates each node
         * in it's direction by the passed-in offset.
         * Scroller will translate each renderable down
         * @method outputFrom
         * @param {Function} fn A function that takes an offset and returns a transform.
         * @param {Function} [masterFn]
         */
        outputFrom(fn: (offset: number)=>fms.Matrix4x4, masterFn: (offset: number)=>fms.Matrix4x4): void;
    
        /**
         * The Scroller instance's method for reading from an external position. Scroller uses
         * the external position to actually scroll through it's renderables.
         * @method positionFrom
         * @param {Getter} position Can be either a function that returns a position,
         * or an object with a get method that returns a position.
         */
        positionFrom(position: number): void;
        positionFrom(position: ()=>number): void;
        positionFrom(position: fms.IValueProvider<number>): void;
        
        // on(type:'edgeHit', handler: (event:{position: number})=> void): void;
    
    
        /**
         * Sets the collection of renderables under the Scrollview instance's control.
         *
         * @method sequenceFrom
         * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous viewSequence.
         */
         sequenceFrom (renderables: T[]): void;
        
         getSize(): fms.Size;
    
         render() : fms.IRenderSpec;
    }

    export = Scroller;
}


