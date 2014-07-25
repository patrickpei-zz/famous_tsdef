/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='../core/OutputHandler.d.ts' />

declare module fms {
    interface IFlexibleLayoutOptions{
        ratios: number[];
        transition: INamedTransition;
    //    direction:number = 0; 
    }
}

declare module "famous/views/FlexibleLayout" {

    import EventHandler = require('famous/core/EventHandler');

    class FlexibleLayout extends fms.OutputHandler implements fms.IRenderable, fms.ISequenceView<fms.IRenderable>{
        static DIRECTION_X:number;
        static DIRECTION_Y:number;
    
        static DEFAULT_OPTIONS: fms.IFlexibleLayoutOptions;
        constructor  (options: fms.IFlexibleLayoutOptions); 
        
        _eventOutput: EventHandler;
        
        setRatios (ratios:number[], namedTransition?: fms.INamedTransition, callback? : ()=>void): void;
        setRatios (ratios:number[], funcTransition: fms.IFuncTransition, callback? : ()=>void): void;
        setRatios (ratios:number[], transition: fms.ITransition, callback? : ()=>void): void;
    
    
        /**
         * Patches the FlexibleLayout instance's options with the passed-in ones.
         */
        setOptions (options: fms.IFlexibleLayoutOptions): void;
        
        sequenceFrom (renderables: fms.IRenderable[]): void;
    
        render() : fms.IRenderSpec;
    }

    export = FlexibleLayout;
}

