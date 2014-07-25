/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/EventHandler.d.ts' />

interface IGenericSyncOptions extends fms.IScalable{
    /** scale */
    scale? : number;
    direction?: number;
}

declare module "famous/inputs/GenericSync" {

    import EventHandler = require('famous/core/EventHandler');

    /**
     * Combines multiple types of sync classes (e.g. mouse, touch,
     *  scrolling) into one standardized interface for inclusion in widgets.
     *
     *  Sync classes are first registered with a key, and then can be accessed
     *  globally by key.
     *
     *  Emits 'start', 'update' and 'end' events as a union of the sync class
     *  providers.
     */
    // TouchSync not extends  EventHandler, but EventHandler is mixin
    class GenericSync extends EventHandler{
        static DIRECTION_X: number;
        static DIRECTION_Y: number;
        static DIRECTION_Z: number;
    
        constructor ();
        constructor (syncs : {[index: string]: IGenericSyncOptions}, options? : IGenericSyncOptions);
        constructor (syncs : string[], options? : IGenericSyncOptions);
    //   on (type:"update", handler: (event:IPayload) => void);
        static register (syncObject : {[index: string]: new() => EventHandler}): void;
        static register (syncObject : new() => EventHandler): void;
        
            /**
         * Helper to set options on all sync instances
         *
         * @method setOptions
         * @param options {Object} options object
         */
        setOptions(options: IGenericSyncOptions): void;
    
        /**
         * Pipe events to a sync class
         *
         * @method pipeSync
         * @param key {String} identifier for sync class
         */
        pipeToSync(key: string): void;
    
        /**
         * Unpipe events from a sync class
         *
         * @method unpipeSync
         * @param key {String} identifier for sync class
         */
        unpipeSync (key: string): void;
    }

    export = GenericSync;
}

