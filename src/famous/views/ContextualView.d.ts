/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface IContextualViewOptions{
    }
}

declare module "famous/views/ContextualView" {

    import EventHandler = require('famous/core/EventHandler');


    // ContextualView in js not extends EventHandler, but EventHandler is mixin
    /**
     * ContextualView is an interface for creating views that need to
     *   be aware of their parent's transform, size, and/or origin.
     *   Consists of a OptionsManager paired with an input EventHandler
     *   and an output EventHandler. Meant to be extended by the developer.
     */
    class ContextualView<T extends fms.IContextualViewOptions> extends EventHandler implements fms.IRenderable{
        constructor  (options?: T); 
        _eventInput: EventHandler;
        _eventOutput: EventHandler;
        options: T;
        /**
         * Look up options value by key
         */
        getOptions() : T;
        /**
         *  Set internal options.
         *  No defaults options are set in ContextualView.
         */
        setOptions(options: T): void;
        render() : fms.IRenderSpec;
    }

    export = ContextualView;
}

