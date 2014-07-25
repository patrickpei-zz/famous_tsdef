/// <reference path='EventHandler.d.ts' />
/// <reference path='Common.d.ts' />
/// <reference path='Modifier.d.ts' />
declare module fms {
    
    interface ISurfaceOption<SIZETYPE>{
        /** the size [width, height] in pixel */
        size? : SIZETYPE[];
        /** CSS classes to set on inner content */
        classes? : string[]; 
        /**  string dictionary of HTML attributes to set on target div */
        properties? : {[index: string]: string};
        /** inner (HTML) content of surface */
        content? : string;
    }
    
    interface ISurfaceOption1 extends ISurfaceOption<number> {}
    
    interface ISurfaceOption2 extends ISurfaceOption<boolean> {}
}

declare module "famous/core/Surface" {
    
    import EventHandler = require('famous/core/EventHandler');

    class Surface implements fms.IRenderable {
        constructor  (options?: fms.ISurfaceOption1); 
        constructor  (options: fms.ISurfaceOption2); 
        /**
         * Bind a callback function to an event type handled by this object.
         *
         * @method "on"
         *
         * @param {string} type event type key (for example, 'click')
         * @param {function(string, Object)} fn handler callback
         * @return {EventHandler} this
         */
        on (type:string, fn: (event:any) => void): EventHandler;
        on (type:"click", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"mousedown", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"mousemove", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"mouseup", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"mouseover", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"mouseout", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"touchstart", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"touchmove", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"touchend", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"touchcancel", fn: (event:MouseEvent) => void): EventHandler;
        on (type:"keydown", fn: (event:KeyboardEvent) => void): EventHandler;
        on (type:"keyup", fn: (event:KeyboardEvent) => void): EventHandler;
        on (type:"keypress", fn: (event:KeyboardEvent) => void): EventHandler;
    
    
        /**
         * Unbind an event by type and handler.
         *   This undoes the work of "on"
         *
         * @method removeListener
         * @param {string} type event type key (for example, 'click')
         * @param {function(string, Object)} fn handler
         */
        removeListener(type:string, fn: (s: string, o:any) => void): void;
    
        /**
         * Trigger an event, sending to all downstream handlers
         *   listening for provided 'type' key.
         *
         * @method emit
         *
         * @param {string} type event type key (for example, 'click')
         * @param {Object} [event] event data
         * @return {EventHandler} this
         */
        emit (type:string, fn: (s: string, o:any) => void): EventHandler;
        
        /**
         * Add event handler object to set of downstream handlers.
         *
         * @method pipe
         *
         * @param {EventHandler} target event handler target object
         * @return {EventHandler} passed event handler
         */
        pipe<T>(target: T): T;
        
        /**
         * Remove handler object from set of downstream handlers.
         *   Undoes work of "pipe"
         *
         * @method unpipe
         *
         * @param {EventHandler} target target handler object
         * @return {EventHandler} provided target
         */
        unpipe(target: EventHandler): EventHandler;
    
    
        /**
         * Set CSS-style properties on this Surface. Note that this will cause
         *    dirtying and thus re-rendering, even if values do not change.
         *
         * @method setProperties
         * @param {Object} properties property dictionary of "key" => "value"
         */
        setProperties(properties? : {[index: string]: string}): void;
    
        /**
         * Get CSS-style properties on this Surface.
         *
         * @method getProperties
         *
         * @return {Object} Dictionary of this Surface's properties.
         */
        getProperties() : {[index: string]: string};
        
        render (): fms.IRenderSpec;
        /**
         * Add CSS-style class to the list of classes on this Surface. Note
         *   this will map directly to the HTML property of the actual
         *   corresponding rendered <div>.
         *
         * @method addClass
         * @param {string} className name of class to add
         */
        addClass(className: string): void;
    
        /**
         * Remove CSS-style class from the list of classes on this Surface.
         *   Note this will map directly to the HTML property of the actual
         *   corresponding rendered <div>.
         *
         * @method removeClass
         * @param {string} className name of class to remove
         */
        removeClass(className: string): void;
        /**
         * Reset class list to provided dictionary.
         * @method setClasses
         * @param {Array.string} classList
         */
        setClasses(classList: string[]): void;
        /**
         * Get array of CSS-style classes attached to this div.
         *
         * @method getClasslist
         * @return {Array.string} array of class names
         */
        getClassList(): string[];
    
        /**
         * Set or overwrite inner (HTML) content of this surface. Note that this
         *    causes a re-rendering if the content has changed.
         *
         * @method setContent
         * @param {string} content HTML content
         */
        setContent(content: string): void;
    
        /**
         * Return inner (HTML) content of this surface.
         *
         * @method getContent
         *
         * @return {string} inner (HTML) content
         */
        getContent() : string;
        /**
         * Set options for this surface
         *
         * @method setOptions
         * @param {Object} [options] overrides for default options.  See constructor.
         */
        setOptions(options: fms.ISurfaceOption1): void;
        setOptions(options: fms.ISurfaceOption2): void;
    
    }

   export = Surface;
}

