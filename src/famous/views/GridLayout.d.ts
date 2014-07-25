/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/OutputHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />

declare module fms {
    interface GridLayoutOptions{
        dimensions: number[];
        transition: boolean;
        gutterSize?: number[];
    }
}

declare module "famous/views/GridLayout" {
    
    import EventHandler = require('famous/core/EventHandler');
    
    class GridLayout extends fms.OutputHandler implements fms.IRenderable, fms.ISequenceView<fms.IRenderable>{
        static DEFAULT_OPTIONS: fms.GridLayoutOptions;
        constructor  (options: fms.GridLayoutOptions);
            
        _eventOutput:EventHandler;
        
        /**
         * Patches the GridLayout instance's options with the passed-in ones.
         */
        setOptions (options: fms.GridLayoutOptions): void;
        
        /**
         * Sets the collection of renderables under the Gridlayout instance's control.
         *
         * @method sequenceFrom
         * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous viewSequence.
         */
         sequenceFrom (renderables: fms.IRenderable[]): void;
    
         render() : fms.IRenderSpec;
    }

   export = GridLayout;
}

