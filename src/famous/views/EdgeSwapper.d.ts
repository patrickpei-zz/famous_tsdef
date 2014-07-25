/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='./RenderController.d.ts' />
/// <reference path='../utilities/Utility.d.ts' />
/// <reference path='./SequentialLayout.d.ts' />
/// <reference path='../core/OutputHandler.d.ts' />


declare module fms {
    interface EdgeSwapperOptions extends RenderControllerOptions  {
    }
}   

declare module "famous/views/EdgeSwapper" {
    
    import EventHandler = require('famous/core/EventHandler');
    import RenderController = require('famous/views/RenderController');
    
    class EdgeSwapper<CONTENT extends fms.IRenderable> extends fms.InputHandler implements fms.IRenderable{
    
       constructor  (options?:  fms.EdgeSwapperOptions); 
       _controller: RenderController;
       _currentTarget: CONTENT;
       _eventInput: EventHandler;
    
       show(content: CONTENT): void;
       render() : fms.IRenderSpec;
    }

   export = EdgeSwapper;
}