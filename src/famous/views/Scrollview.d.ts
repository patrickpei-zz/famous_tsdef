/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='../utilities/Utility.d.ts' />


declare module fms {
    interface IScrollviewOptions{
        direction?: number;
        rails?: boolean;
        friction?: number;
        drag?: number;
        edgeGrip?: number;
        edgePeriod?: number;
        edgeDamp?: number;
        margin?: number;
        paginated?: boolean;
        pagePeriod?: number;
        pageDamp?: number;
        pageStopSpeed?: number;
        pageSwitchSpeed?: number;
        speedLimit?: number;
        groupScroll?: boolean;
    }
}

declare module "famous/views/Scrollview" {

    import EventHandler = require('famous/core/EventHandler');
    import ViewSequence = require('famous/core/ViewSequence');

    //  EventHandler is mixed in
    class Scrollview<T extends fms.IRenderable>  extends EventHandler implements fms.IRenderable, fms.ISequenceView<T>{
        static DEFAULT_OPTIONS: fms.IScrollviewOptions;
        _touchCount: number;
        _springState: number;
        _onEdge: number; // -1 for top, 1 for bottom
        _pageSpringPosition: number;
        _edgeSpringPosition: number;
        _touchVelocity: number;
        _earlyEnd: boolean;
        _needsPaginationCheck: boolean;
        options: fms.IScrollviewOptions;
        _node:ViewSequence<T>;
        _eventInput: EventHandler;
        _eventOutput: EventHandler;
    
    
        constructor  (options?: fms.IScrollviewOptions);
        
    //    enum SpringStates {
    //        NONE: 0,
    //        EDGE: 1,
    //        PAGE: 2
    //    };
    
    
            
        /**
         * Patches the Scrollview instance's options with the passed-in ones.
         */
        setOptions (options: fms.IScrollviewOptions): void;
        /**
         * Returns the position associated with the Scrollview instance's current node
         *  (generally the node currently at the top).
         * @param {number} [node] If specified, returns the position of the node at that index in the
         * Scrollview instance's currently managed collection.
         * @return {number} The position of either the specified node, or the Scrollview's current Node,
         * in pixels translated.
         */
        getPosition() : number;
    
        /**
         * Sets position of the physics particle that controls Scrollview instance's "position"
         * @param {number} x The amount of pixels you want your scrollview to progress by.
         */
        setPosition(x: number): void;
    
        /**
         * Returns the Scrollview instance's velocity.
         */
        getVelocity() : number;
    
        /**
         * Sets the Scrollview instance's velocity. Until affected by input or another call of setVelocity
         *  the Scrollview instance will scroll at the passed-in velocity.
         * @method setVelocity
         * @param {number} v The magnitude of the velocity.
         */
        setVelocity(v: number): void;
    
    
        /**
         * goToPreviousPage paginates your Scrollview instance backwards by one item.
         * @method goToPreviousPage
         * @return {ViewSequence} The previous node.
         */
        goToPreviousPage(): ViewSequence<T>;
    
        /**
         * goToNextPage paginates your Scrollview instance forwards by one item.
         * @method goToNextPage
         * @return {ViewSequence} The next node.
         */
        goToNextPage(): ViewSequence<T>;
        
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

    export = Scrollview;
}


