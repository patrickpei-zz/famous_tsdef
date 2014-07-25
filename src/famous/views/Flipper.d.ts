/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='../utilities/Utility.d.ts' />
/// <reference path='./SequentialLayout.d.ts' />

declare module fms {
    interface FlipperOptions{
       /** transition executed when flipping your Flipper instance */
       transition: boolean;
       /** direction see Flipper.DIRECTION_X, Flipper.DIRECTION_Y */
       direction: number;
    }
}

declare module "famous/views/Flipper" {
    
    class Flipper implements fms.IRenderable{
       static DIRECTION_X : number;
       static DIRECTION_Y : number;
       constructor  (options:  fms.FlipperOptions); 
        
        /**
         * Toggles the rotation between the front and back renderables
         *
         * @method flip
         * @param {Object} [transition] Transition definition
         * @param {Function} [callback] Callback
         */
        flip(transition: fms.ITransition     , callback?: ()=>void): void;
        flip(transition: fms.INamedTransition, callback?: ()=>void): void;
        flip(transition?: fms.IFuncTransition, callback?: ()=>void): void;
        /**
         * Basic setter to the angle
         *
         * @method setAngle
         * @param {Number} angle
         * @param {Object} [transition] Transition definition
         * @param {Function} [callback] Callback
         */
        setAngle(angle:number, transition: fms.ITransition     , callback?: ()=>void): void;
        setAngle(angle:number, transition: fms.INamedTransition, callback?: ()=>void): void;
        setAngle(angle:number, transition?: fms.IFuncTransition, callback?: ()=>void): void;
    
        
        /**
         * Patches the Flipper instance's options with the passed-in ones.
         *
         * @method setOptions
         * @param {Options} options An object of configurable options for the Flipper instance.
         */
        setOptions(options: fms.FlipperOptions): void;
    
        /**
         * Adds the passed-in renderable to the view associated with the 'front' of the Flipper instance.
         *
         * @method setFront
         * @chainable
         * @param {Object} node The renderable you want to add to the front.
         */
        setFront(node: fms.IRenderable): void;
    
        /**
         * Adds the passed-in renderable to the view associated with the 'back' of the Flipper instance.
         *
         * @method setBack
         * @chainable
         * @param {Object} node The renderable you want to add to the back.
         */
        setBack(node: fms.IRenderable): void;
        render() : fms.IRenderSpec;
    }

   export = Flipper;
}
