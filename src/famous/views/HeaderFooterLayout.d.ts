/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />

declare module fms {
    interface HeaderFooterLayoutOptions{
        direction?: number;
        headerSize?: number;
        footerSize?: number;
    }
}

declare module "famous/views/HeaderFooterLayout" {
    
    import RenderNode = require('famous/core/RenderNode');
    
    class HeaderFooterLayout implements fms.IRenderable{
        /**
         *  When used as a value for your HeaderFooterLayout's direction option, causes it to lay out horizontally.
         */
        static DIRECTION_X: number;
    
        /**
         *  When used as a value for your HeaderFooterLayout's direction option, causes it to lay out vertically.
         */
        static DIRECTION_Y: number;
    
        constructor  (options: fms.HeaderFooterLayoutOptions); 
        
        /**
         * Patches the HeaderFooterLayout instance's options with the passed-in ones.
         */
        setOptions (options: fms.HeaderFooterLayoutOptions): void; 
    
        
        header: RenderNode;
        footer: RenderNode;
        content: RenderNode;
    
    
        render() : fms.IRenderSpec;
    
        /**
         * Return size of contained element.
         *
         * @method getSize
         * @return {Array.Number} [width, height]
         */
        getSize(): fms.Size;
    }

   export = HeaderFooterLayout;
}
