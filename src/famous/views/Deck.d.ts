/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='../utilities/Utility.d.ts' />
/// <reference path='./SequentialLayout.d.ts' />

declare module fms {
    interface DeckOptions<TRANSITION>{
        itemSpacing: number;
        transition: TRANSITION;
        stackRotation:number;
        direction: number;
        defaultItemSize?:Size;
    }

}
    
declare module "famous/views/Deck" {
    
    import SequentialLayout = require('famous/views/SequentialLayout');

    /**
     * A Sequential Layout that can be opened and closed with animations.
     *
     *   Takes the same options as SequentialLayout
     *   as well as options for the open/close transition
     *   and the rotation you want your Deck instance to layout in.
     */
    class Deck<T extends fms.IRenderable> extends SequentialLayout<T>{
        constructor  (options: fms.DeckOptions<fms.ITransition>);
        constructor  (options: fms.DeckOptions<fms.INamedTransition>);
        constructor  (options: fms.DeckOptions<fms.IFuncTransition>);
        
        /**
         * An accesor method to find out if the messaged Deck instance is open or closed.
         */
        isOpen() : boolean;
    
        /**
         * Sets the Deck instance to an open state.
         */
        open(callback? : ()=>void): void; 
    
        /**
         * Sets the Deck instance to an open state.
         */
        close(callback? : ()=>void): void;
    
        /**
         * Sets the Deck instance from its current state to the opposite state.
         */
        toggle(callback? : ()=>void): void;
    }

    export = Deck;
}

