declare module fms {
    interface Align extends Array<number>{}
    interface Origin extends Array<number>{}
    interface Origin3 extends Array<number>{}
    interface Size extends Array<number>{}
    interface Size3 extends Array<number>{}
    interface Range extends Array<number>{}
    interface Dimension extends Array<number>{}
    interface Point2d extends Array<number>{}
    interface Vector3 extends Array<number>{}
    interface Vector4 extends Array<number>{}
    interface Matrix4x4 extends Array<number>{}
    
    interface curveFunction {
        (d: number): number;        
    }
    
    interface INamedTransition{
       duration: number; // duration of the transition
       curve?: string; // definition of a curve
    }
    
    interface IFuncTransition{
       duration: number; // duration of the transition
       curve: curveFunction;
    }
    
    interface ITransition{
       method: string;
       period: number;
       dampingRation?: number;
       velocity?: number
    }
    
    /**
     * IRenderSpec is the result of te render method.
     * IRenderSpec is one of following possibility:
     * - a IRenderSpecElement
     * - a Array of IRenderSpec
     * - a number (id)
     */
    interface IRenderSpec{
    }
    
    interface IRenderSpecElement{
       id?: string;
       target: IRenderSpec;
       opacity?: number;
       transform?: IRenderSpecTransform;
       origin?: Origin;
       spec?: Align;
       size?: Size;
    }

    /**
     * IRenderSpec is the result of te render method.
     * IRenderSpecTransform is one of following possibility:
     * - a fms.Matrix4x4
     * - a Array of IRenderSpecTransformDef
     * - a number (id)
     */
    interface IRenderSpecTransform{
        
    }
    /**
     * IRenderSpecTransformDef is an object with one of the following attribute is set
     */
    interface IRenderSpecTransformDef{
        translate?: fms.Vector3;
        rotate?: number;
        rotateX?: number;
        rotateY?: number;
        rotateZ?: number;
        rotateAxis?: number[];
        scale?: fms.Vector3;
        skew?: fms.Vector3;
        matrix3d?: () => fms.Matrix4x4;
        
    }
    


    
    interface IModifier {
       modify (renderSpec: IRenderSpec): IRenderSpec;
    }
    
    interface IRenderable{
       render (): IRenderSpec;
    }

    interface IValueProvider<T>{
       get (): T;
    }


    /**
     * Sets the collection of renderables under the FlexibleLayout instance's control.
     *
     * @method sequenceFrom
     * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous viewSequence.
     */
    interface ISequenceView<T extends IRenderable>{
        sequenceFrom (renderables: T[]): void;
    }
    
    interface IScalable {
        /** scale factor, 1 or undefined is identity  */
        scale?: number;
    }
    
    interface ITransionable<T> {
        set (state: T, transition?: any, callback? : ()=>void): any;
        reset (state: T): any;
        get (): T;
    }

}





declare module "famous/core/Context" {

    import EventEmitter = require('famous/core/EventEmitter');
    import RenderNode = require('famous/core/RenderNode');

    class Context extends EventEmitter{
        constructor  (container : Element); 
        
        
        /**
         * Add renderables to this Context's render tree.
         */
        add (renderable: fms.IRenderable): RenderNode;
        add (modifier: fms.IModifier): RenderNode;
    
        /**
         * Move this Context to another containing document element.
         */
        migrate(container: Element): void;
    
        /**
         * Gets viewport size for Context.
         */
        getSize(): fms.Size;
    
        /**
         * Sets viewport size for Context.
         *
         */
        setSize(size: fms.Size): void;
        /**
         * Get current perspective of this context in pixels.
         */
        getPerspective() : number;
        /**
         * Set current perspective of this context in pixels.
         *
         * @method setPerspective
         * @param {Number} perspective in pixels
         * @param {Object} [transition] Transitionable object for applying the change
         * @param {function(Object)} callback function called on completion of transition
         */
        setPerspective(perspective:number, transition: fms.ITransition     , callback?: ()=>void): void;
        setPerspective(perspective:number, transition: fms.INamedTransition, callback?: ()=>void): void;
        setPerspective(perspective:number, transition?: fms.IFuncTransition, callback?: ()=>void): void;
    }

   export = Context;
}





declare module "famous/core/Engine" {

    import Context = require('famous/core/Context');
    import EventHandler = require('famous/core/EventHandler');

    class Engine {
        static createContext() : Context;
        /**
         * Bind a callback function to an event type handled by this object.
         *
         * @method "on"
         *
         * @param {string} type event type key (for example, 'click')
         * @param {function(string, Object)} fn handler callback
         * @return {EventHandler} this
         */
        static on (type:string, fn: (event:any) => void): EventHandler;
        static on (type:"click", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mousedown", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mousemove", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mouseup", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mouseover", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mouseout", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchstart", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchmove", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchend", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchcancel", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"keydown", fn: (event:KeyboardEvent) => void): EventHandler;
        static on (type:"keyup", fn: (event:KeyboardEvent) => void): EventHandler;
        static on (type:"keypress", fn: (event:KeyboardEvent) => void): EventHandler;
    
    
        /**
         * Unbind an event by type and handler.
         *   This undoes the work of "on"
         *
         * @method removeListener
         * @param {string} type event type key (for example, 'click')
         * @param {function(string, Object)} fn handler
         */
        static removeListener(type:string, fn: (s: string, o:any) => void): void;
    
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
        static emit (type:string, fn: (s: string, o:any) => void): EventHandler;
        
        /**
         * Add event handler object to set of downstream handlers.
         *
         * @method pipe
         *
         * @param {EventHandler} target event handler target object
         * @return {EventHandler} passed event handler
         */
        static pipe(target: EventHandler): EventHandler;
        
        /**
         * Remove handler object from set of downstream handlers.
         *   Undoes work of "pipe"
         *
         * @method unpipe
         *
         * @param {EventHandler} target target handler object
         * @return {EventHandler} provided target
         */
        static unpipe(target: EventHandler): EventHandler;
    }
    export = Engine;
}

declare module fms {
   interface IEventEmitter { 
      emit(type:string, event?:any) : void; 
   }        
}
declare module "famous/core/EventEmitter" {
    class EventEmitter implements fms.IEventEmitter{
        /**
         * Trigger an event, sending to all downstream handlers
         *   listening for provided 'type' key.
         *
         * @param for example, 'click'
         * @param event data
         */
        emit(type:string, event?:any) : void;
    
        /**
         * Bind a callback function to an event type handled by this object.
         *
         * @method "on"
         *
         * @param type event type key (for example, 'click')
         * @param handler callback
         * @return this
         */
        on(type:string, handler: (event:any) => void) : void; 
        /**
         * Alias for "on".
         */
        addListener(type:string, handler: (event:any) => void) : void;
    
       /**
         * Unbind an event by type and handler.
         *   This undoes the work of "on".
         */
        removeListener(type:string, handler: (event:any) => void) : void;
    
        /**
         * Call event handlers with this set to owner.
         * @param owner object this EventEmitter belongs to
         */
        bindThis(owner: any): void;
    
    }
    export = EventEmitter;
}

declare module "famous/core/EventHandler" {
    
    import EventEmitter = require('famous/core/EventEmitter');

    class EventHandler extends EventEmitter {
        /**
         * Assign an event handler to receive an object's input events.
         *
         * @param {Object} object object to mix trigger, subscribe, and unsubscribe functions into
         * @param {EventHandler} handler assigned event handler
         */
        static setInputHandler(object:any, handler:EventHandler): void;
    
        /**
         * Assign an event handler to receive an object's output events.
         *
         * @param {Object} object object to mix pipe, unpipe, on, addListener, and removeListener functions into
         * @param {EventHandler} handler assigned event handler
         */
        static setOutputHandler(object:any, handler:EventHandler): void;
    
    
        /**
         * Add event handler object to set of downstream handlers.
         *
         * @param {EventHandler} target event handler target object
         * @return {EventHandler} passed event handler
         */
        pipe(target:EventHandler): EventHandler;
        /**
         * Remove handler object from set of downstream handlers.
         *   Undoes work of "pipe".
         *
         * @method unpipe
         *
         * @param {EventHandler} target target handler object
         * @return {EventHandler} provided target
         */
        unpipe(target:EventHandler): EventHandler;
    
    
        /**
         * Listen for events from an upstream event handler.
         *
         * @method subscribe
         *
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        subscribe(source: EventEmitter) : EventHandler;
    
        /**
         * Stop listening to events from an upstream event handler.
         *
         * @method unsubscribe
         *
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        unsubscribe(source: EventEmitter) : EventHandler;
        
    }
    export = EventHandler;
}




declare module fms {
    interface IModifierOptions<TRANSFORM>{
        /** the origin adjustment [x, y] in pixel */
        origin? : number[];
        /** affine transformation matrix */
        transform? : TRANSFORM;
        /** opacity */
        opacity? : Number;
        /** the size [width, height] in pixel */
        size? : number[];
    }
    interface IModifierOptionsS extends IModifierOptions<fms.Matrix4x4>{}
    interface IModifierOptionsF extends IModifierOptions<() => fms.Matrix4x4>{}
}

declare module "famous/core/Modifier" {

    class Modifier implements fms.IModifier{
        constructor  (options?: fms.IModifierOptionsS); 
        constructor  (options: fms.IModifierOptionsF); 
        
        /**
         * Function, object, or static transform matrix which provides the transform.
         * This is evaluated on every tick of the engine.
         *
         * @method transformFrom
         *
         * @param {Object} transform transform provider object
         * @return {Modifier} this
         */
        transformFrom(transform: fms.Matrix4x4): Modifier; 
        transformFrom(transform: () => fms.Matrix4x4): Modifier; 
        transformFrom(transform: fms.IValueProvider<fms.Matrix4x4>): Modifier; 
    
        /**
         * Set function, object, or number to provide opacity, in range [0,1].
         *
         * @method opacityFrom
         *
         * @param {Object} opacity provider object
         * @return {Modifier} this
         */
        opacityFrom(opacity: number): Modifier;
        opacityFrom(opacity: () => number): Modifier;
        opacityFrom(opacity: fms.IValueProvider<number>): Modifier;
    
        /**
         * Set function, object, or numerical array to provide origin, as [x,y],
         *   where x and y are in the range [0,1].
         *
         * @method originFrom
         *
         * @param {Object} origin provider object
         * @return {Modifier} this
         */
        originFrom(origin: fms.Origin): Modifier;
        originFrom(opacity: () => fms.Origin): Modifier;
        originFrom(opacity: fms.IValueProvider<fms.Origin>): Modifier;
    
        /**
         * Set function, object, or numerical array to provide align, as [x,y],
         *   where x and y are in the range [0,1].
         *
         * @method alignFrom
         *
         * @param {Object} align provider object
         * @return {Modifier} this
         */
        alignFrom(align: fms.Align): Modifier;
        alignFrom(align: () => fms.Align): Modifier;
        alignFrom(align: fms.IValueProvider<fms.Align>): Modifier;
        /**
         * Set function, object, or numerical array to provide size, as [width, height].
         *
         * @method sizeFrom
         *
         * @param {Object} size provider object
         * @return {Modifier} this
         */
        sizeFrom(align: fms.Size): Modifier;
        sizeFrom(align: () => fms.Size): Modifier;
        sizeFrom(align: fms.IValueProvider<fms.Size>): Modifier;
    
         /**
         * Deprecated: Prefer transformFrom with static Transform, or use a TransitionableTransform.
         * @deprecated
         * @method setTransform
         *
         * @param {Transform} transform Transform to transition to
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setTransform(transform: fms.Matrix4x4, transition: fms.INamedTransition, callback?: ()=> void): Modifier;
        setTransform(transform: () => fms.Matrix4x4, transition: fms.INamedTransition, callback?: ()=> void): Modifier;
        setTransform(transform: fms.IValueProvider<fms.Matrix4x4>, transition: fms.INamedTransition, callback?: ()=> void): Modifier;
        /**
         * Deprecated: Prefer opacityFrom with static opacity array, or use a Transitionable with that opacity.
         * @deprecated
         * @method setOpacity
         *
         * @param {Number} opacity Opacity value to transition to.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setOpacity(opacity: number, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOpacity(opacity: ()=>number, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOpacity(opacity: fms.IValueProvider<number>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        /**
         * Deprecated: Prefer originFrom with static origin array, or use a Transitionable with that origin.
         * @deprecated
         * @method setOrigin
         *
         * @param {Array.Number} origin two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setOrigin(origin: fms.Origin, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOrigin(origin: ()=>fms.Origin, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOrigin(origin:fms.IValueProvider<fms.Origin>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
    
        /**
         * Deprecated: Prefer alignFrom with static align array, or use a Transitionable with that align.
         * @deprecated
         * @method setAlign
         *
         * @param {Array.Number} align two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setAlign(align: fms.Align, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setAlign(align: ()=>fms.Align, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setAlign(align: fms.IValueProvider<fms.Align>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
    
        /**
         * Deprecated: Prefer sizeFrom with static origin array, or use a Transitionable with that size.
         * @deprecated
         * @method setSize
         * @param {Array.Number} size two element array of [width, height]
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setSize(size: fms.Size, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setSize(size: ()=>fms.Size, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setSize(size: fms.IValueProvider<fms.Size>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
    
        /**
         * Deprecated: Prefer to stop transform in your provider object.
         * @deprecated
         * @method halt
         */
        halt(): void;
        /**
         * Deprecated: Prefer to use your provided transform or output of your transform provider.
         * @deprecated
         * @method getTransform
         * @return {Object} transform provider object
         */
        getTransform(): fms.IValueProvider<fms.Matrix4x4>;
    
        /**
         * Deprecated: Prefer to determine the end state of your transform from your transform provider
         * @deprecated
         * @method getFinalTransform
         * @return {Transform} transform matrix
         */
        getFinalTransform(): fms.Matrix4x4;
    
        /**
         * Deprecated: Prefer to use your provided opacity or output of your opacity provider.
         * @deprecated
         * @method getOpacity
         * @return {Object} opacity provider object
         */
        getOpacity(): fms.IValueProvider<number>;
    
        /**
         * Deprecated: Prefer to use your provided origin or output of your origin provider.
         * @deprecated
         * @method getOrigin
         * @return {Object} origin provider object
         */
        getOrigin(): fms.IValueProvider<fms.Origin>;
    
        /**
         * Deprecated: Prefer to use your provided align or output of your align provider.
         * @deprecated
         * @method getAlign
         * @return {Object} align provider object
         */
        getAlign(): fms.IValueProvider<fms.Align>;
    
        /**
         * Deprecated: Prefer to use your provided size or output of your size provider.
         * @deprecated
         * @method getSize
         * @return {Object} size provider object
         */
        getSize(): fms.IValueProvider<fms.Size>; 
        
        /**
         * modifies the render spec
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
        
    }

    export = Modifier;
}



declare module "famous/core/OptionsManager" {
    
    class OptionsManager{
        /**
         *  A collection of methods for setting options which can be extended
         *  onto other classes.
         *
         *
         *  **** WARNING ****
         *  You can only pass through objects that will compile into valid JSON.
         *
         *  Valid options:
         *      Strings,
         *      Arrays,
         *      Objects,
         *      Numbers,
         *      Nested Objects,
         *      Nested Arrays.
         *
         *    This excludes:
         *        Document Fragments,
         *        Functions
         * @class OptionsManager
         * @constructor
         * @param {Object} value options dictionary
         */
        constructor  (options?: any); 
            /**
         * Create OptionsManager from source with arguments overriden by patches.
         *   Triggers 'change' event on this object's event handler if the state of
         *   the OptionsManager changes as a result.
         *
         * @method patch
         *
         * @param {...Object} arguments list of patch objects
         * @return {OptionsManager} this
         */
        public patch(...o: any[]): OptionsManager;
    
        /**
         * Alias for patch
         *
         * @method setOptions
         *
         */
        public setOptions(...o: any[]) : OptionsManager;
    
        /**
         * Return OptionsManager based on sub-object retrieved by key
         *
         * @method key
         *
         * @param {string} identifier key
         * @return {OptionsManager} new options manager with the value
         */
        public key(identifier: string) : OptionsManager;
    
        /**
         * Look up value by key
         * @method get
         *
         * @param {string} key key
         * @return {Object} associated object
         */
        public get(key: string): any;
    
        /**
         * Alias for get
         * @method getOptions
         */
        public getOptions(key: string): any;
    
        /**
         * Set key to value.  Outputs 'change' event if a value is overwritten.
         *
         * @method set
         *
         * @param {string} key key string
         * @param {Object} value value object
         * @return {OptionsManager} new options manager based on the value object
         */
        public set(key: string, value: any): OptionsManager 
    
        /**
         * Return entire object contents of this OptionsManager.
         *
         * @method value
         *
         * @return {Object} current state of options
         */
        public value(): any;
    }

   export = OptionsManager;
}


declare module fms {
    // TODO besser machen
    module handler {
        interface EventEmitter {}   
        interface EventHandler {}   
    }
    /**
     * InputHander is a class mixed in by the EventHandler.setInputHandler
     * trigger, subscribe, and unsubscribe functions 
     */
    class InputHandler{
        /**
         * Trigger an event, sending to all downstream handlers
         * listening for provided 'type' key.
         * @param {string} type event type key (for example, 'click')
         * @param  event event data
         * @return {EventHandler} this
         */
        trigger(type:string, event:any): InputHandler;
        /**
         * Listen for events from an upstream event handler.
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        subscribe(source: fms.handler.EventEmitter): InputHandler;
    
        /**
         * Stop listening to events from an upstream event handler.
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        unsubscribe(source: fms.handler.EventEmitter): InputHandler;
    }
    /**
     * OutputHander is a class mixed in by the EventHandler.setOutputHandler
     * pipe, unpipe, on , addListener, removeListener
     */
    class OutputHandler{
        /**
         * Add event handler object to set of downstream handlers.
         *
         * @param {EventHandler} target event handler target object
         * @return {EventHandler} passed event handler
         */
        pipe(target: fms.handler.EventHandler): OutputHandler;
        /**
         * Remove handler object from set of downstream handlers.
         *   Undoes work of "pipe".
         *
         * @method unpipe
         *
         * @param {OutputHander} target target handler object
         * @return {OutputHander} provided target
         */
        unpipe(target: fms.handler.EventHandler): OutputHandler;
        
            /**
         * Bind a callback function to an event type handled by this object.
         *
         * @method "on"
         *
         * @param type event type key (for example, 'click')
         * @param handler callback
         * @return this
         */
        on(type:string, handler: (event:any) => void) : OutputHandler; 
        /**
         * Alias for "on".
         */
        addListener(type:string, handler: (event:any) => void) : OutputHandler;
    
       /**
         * Unbind an event by type and handler.
         *   This undoes the work of "on".
         */
        removeListener(type:string, handler: (event:any) => void) : OutputHandler;
    }
}







declare module "famous/core/RenderNode" {
    class RenderNode implements fms.IRenderable{
        constructor  (renerableObj: fms.IRenderable); 
    
        /**
         * Add a child renderable to the view.
         *   Note: This is meant to be used by an inheriting class
         *   rather than from outside the prototype chain.
         *
         * @method add
         * @return {RenderNode}
         * @protected
         */
        add(renderable: fms.IRenderable) : RenderNode;
        add(...renderable: fms.IRenderable[]) : RenderNode;
        
        add(modifier: fms.IModifier) : RenderNode;
    
        
        get () : fms.IRenderable;
        set (renerableObj: fms.IRenderable): void;
        render() : fms.IRenderSpec;
    
        /**
         * Return size of contained element.
         *
         * @method getSize
         * @return {Array.Number} [width, height]
         */
        getSize(): fms.Size;
    }

    export = RenderNode;
}





declare module "famous/core/Scene" {
    import RenderNode = require('famous/core/RenderNode');
    /**
     * Builds and renders a scene graph based on a declarative structure definition.
     * See the Scene examples in the examples distribution (http://github.com/Famous/examples.git).
     */
    class Scene implements fms.IRenderable {
        public id: {[key: string]: RenderNode}; 
        /**
         * constructor
         * @param definition definition in the format of a render spec.
         */
        constructor  (definition?: fms.IRenderSpecElement); 
        
        /**
         * Clone this scene
         * @return {Scene} deep copy of this scene
         */
        create(): Scene;
        /**
         * Builds and renders a scene graph based on a canonical declarative scene definition.
         * See examples/Scene/example.js.
         * @param definition definition in the format of a render spec.
         */
        load(definition: fms.IRenderSpecElement): void;
    
        /**
         * Add renderables to this component's render tree
         *
         * @method add
         *
         * @param {Object} obj renderable object
         * @return {RenderNode} Render wrapping provided object, if not already a RenderNode
         */
        add(obj: fms.IRenderable): RenderNode;
        
        /**
         * modifies the render spec
         */
        render(): fms.IRenderSpec;
        
    }

    export = Scene;
}





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




declare module fms {
    
    interface ITransformSpec {
        translate: Vector3;
        rotate: Vector3;
        scale: Vector3;
        skew: Vector3;
    }
    
    interface ITransform {
        precision: number;  
        identity :Matrix4x4;
        /**
         * Multiply two or more Transform matrix types to return a Transform matrix.
         */
        multiply4x4(a:Matrix4x4, b:Matrix4x4): Matrix4x4;
        /**
         * Fast-multiply two or more Transform matrix types to return a
         *    Matrix, assuming bottom row on each is [0 0 0 1].
         */
        multiply(a:Matrix4x4, b:Matrix4x4): Matrix4x4;
        /**
         * Return a Transform translated by additional amounts in each
         *    dimension. This is equivalent to the result of
         *
         * @param {Array.Number} t floats delta vector of length 2 or 3
         * @return {Transform} the resulting translated matrix
         */
        thenMove(m:Matrix4x4, t:Vector3): Matrix4x4;
        /**
         * Return a Transform atrix which represents the result of a transform matrix
         *    applied after a move. This is faster than the equivalent multiply.
         *    This is equivalent to the result of:
         *
         *    Transform.multiply(m, Transform.translate(t[0], t[1], t[2])).
         *
         */
        moveThen(v:Vector3, m:Matrix4x4):Matrix4x4;
    
        /**
         * Return a Transform which represents a translation by specified
         *    amounts in each dimension.
         *
         */
        translate(x:number, y:number, z:number):Matrix4x4;
    
        /**
         * Return a Transform scaled by a vector in each
         *    dimension. This is a more performant equivalent to the result of
         *
         *    Transform.multiply(Transform.scale(s[0], s[1], s[2]), m).
         *
         */
        thenScale(m:Matrix4x4, s:Vector3) : Matrix4x4;
    
        /**
         * Return a Transform which represents a scale by specified amounts
         *    in each dimension.
         */
        scale(x:number, y:number, z:number):Matrix4x4;
    
        /**
         * Return a Transform which represents a clockwise
         *    rotation around the x axis.
         */
        rotateX(theta: number):Matrix4x4;
    
        /**
         * Return a Transform which represents a clockwise
         *    rotation around the y axis.
         */
         rotateY(theta: number):Matrix4x4;
    
        /**
         * Return a Transform which represents a clockwise
         *    rotation around the z axis.
         *
         */
         rotateZ(theta: number):Matrix4x4;
    
        /**
         * Return a Transform which represents composed clockwise
         *    rotations along each of the axes. Equivalent to the result of
         *    Matrix.multiply(rotateX(phi), rotateY(theta), rotateZ(psi)).
         */
        rotate(phi:number, theta:number, psi:number):Matrix4x4;
        /**
         * Return a Transform which represents an axis-angle rotation
         *
         * @method rotateAxis
         * @static
         * @param {Array.Number} v unit vector representing the axis to rotate about
         * @param {Number} theta radians to rotate clockwise about the axis
         * @return {Transform} the resulting matrix
         */
        rotateAxis(v:Vector3, theta:number):Matrix4x4;
    
        /**
         * Return a Transform which represents a transform matrix applied about
         * a separate origin point.
         *
         * @method aboutOrigin
         * @static
         * @param {Array.Number} v origin point to apply matrix
         * @param {Transform} m matrix to apply
         * @return {Transform} the resulting matrix
         */
        aboutOrigin(v:Vector3, m:Matrix4x4):Matrix4x4; 
    
        /**
         * Return a Transform representation of a skew transformation
         *
         */
        skew(phi:number, theta:number, psi:number):Matrix4x4;
    
        /**
         * Returns a perspective Transform matrix
         *
         * @method perspective
         * @static
         * @param {Number} focusZ z position of focal point
         * @return {Transform} the resulting matrix
         */
        perspective(focusZ:number):Matrix4x4;
    
        /**
         * Return translation vector component of given Transform
         *
         * @method getTranslate
         * @static
         * @param {Transform} m matrix
         * @return {Array.Number} the translation vector [t_x, t_y, t_z]
         */
        getTranslate(m:Matrix4x4):Vector3;
    
        /**
         * Return inverse affine matrix for given Transform.
         *   Note: This assumes m[3] = m[7] = m[11] = 0, and m[15] = 1.
         *   Will provide incorrect results if not invertible or preconditions not met.
         *
         */
        inverse(m:Matrix4x4):Matrix4x4;
        /**
         * Returns the transpose of a 4x4 matrix
         *
         */
        transpose(m:Matrix4x4):Matrix4x4;
        
        /**
         * Decompose Transform into separate .translate, .rotate, .scale,
         *    and .skew components.
         *
         */
        interpret(M:Matrix4x4):ITransformSpec
    
    
    
        /**
         * Weighted average between two matrices by averaging their
         *     translation, rotation, scale, skew components.
         *     f(M1,M2,t) = (1 - t) * M1 + t * M2
         *
         */
        average(M1:Matrix4x4, M2:Matrix4x4, t:number):Matrix4x4;
    
        /**
         * Compose .translate, .rotate, .scale, .skew components into
         * Transform matrix
         */
        build(spec:ITransformSpec):Matrix4x4;
    
        /**
         * Determine if two Transforms are component-wise equal
         *   Warning: breaks on perspective Transforms
         *
         */
        equals(a:Matrix4x4, b:Matrix4x4):boolean;
    
        /**
         * Determine if two Transforms are component-wise unequal
         *   Warning: breaks on perspective Transforms
         */
        notEquals(a:Matrix4x4, b:Matrix4x4):boolean;
    
        /**
         * Constrain angle-trio components to range of [-pi, pi).
         *
         * @method normalizeRotation
         * @static
         * @param {Array.Number} rotation phi, theta, psi (array of floats
         *    && array.length == 3)
         * @return {Array.Number} new phi, theta, psi triplet
         *    (array of floats && array.length == 3)
         */
        normalizeRotation(rotation:Vector3):Vector3;
    
        /**
         * (Property) Array defining a translation forward in z by 1
         */
        inFront:Matrix4x4;
    
        /**
         * (Property) Array defining a translation backwards in z by 1
         */
        behind:Matrix4x4;
    
    }
}
declare var Transform : fms.ITransform;
declare module "famous/core/Transform" {
   export = Transform;
}






declare module fms {
    interface IViewOptions{
        size?: fms.Size;
    }
}

declare module "famous/core/View" {

    import EventHandler = require('famous/core/EventHandler');
    import RenderNode = require('famous/core/RenderNode');


    // View in js not extends EventHandler, but EventHandler is mixin
    /**
     * Useful for quickly creating elements within applications
     *   with large event systems.  Consists of a RenderNode paired with
     *   an input EventHandler and an output EventHandler.
     *   Meant to be extended by the developer.
     */
    class View<T extends fms.IViewOptions> extends EventHandler implements fms.IRenderable{
        
    
        constructor  (options?: T); 
        _eventInput: EventHandler;
        _eventOutput: EventHandler;
        options: T;
        _node: RenderNode;
        
    
        /**
         * Look up options value by key
         */
        getOptions() : T;
    
        /**
         *  Set internal options.
         *  No defaults options are set in View.
         */
        setOptions(options: T): void;
        /**
         * Add a child renderable to the view.
         *   Note: This is meant to be used by an inheriting class
         *   rather than from outside the prototype chain.
         */
        add(renderable: fms.IRenderable) : RenderNode;
        add(...renderable: fms.IRenderable[]) : RenderNode;
        /**
         * Alias for add
         */
        _add(renderable: fms.IRenderable) : RenderNode;
        
        /**
         * Add a modifier to the view.
         */
        add(modifier: fms.IModifier) : RenderNode;
        /**
         * Alias for add
         */
        _add(modifier: fms.IModifier) : RenderNode;
        
        /**
         * Generate a render spec from the contents of this component.
         */
        render() : fms.IRenderSpec;
    
        /**
         * Return size of contained element.
         *
         * @method getSize
         * @return {Array.Number} [width, height]
         */
        getSize(): fms.Size;
    }

    export = View;
}





declare module "famous/core/ViewSequence" {

    class ViewSequence<T extends fms.IRenderable> implements fms.IRenderable, fms.IValueProvider<T> {
        index: number;
        _: {array: T[]}
        constructor  (values: T[]); 
        /**
         * Return ViewSequence node previous to this node in the list, respecting looping if applied.
         *
         * @method getPrevious
         * @return {ViewSequence} previous node.
         */
        getPrevious(): ViewSequence<T>;
    
        /**
         * Return ViewSequence node next after this node in the list, respecting looping if applied.
         *
         * @method getNext
         * @return {ViewSequence} next node.
         */
        getNext(): ViewSequence<T>;
    
        /**
         * Return index of this ViewSequence node.
         *
         * @method getIndex
         * @return {Number} index
         */
        getIndex(): number;
    
        /**
         * Return printable version of this ViewSequence node.
         *
         * @method toString
         * @return {string} this index as a string
         */
        toString(): string;
    
        /**
         * Add one or more objects to the beginning of the sequence.
         *
         * @method unshift
         * @param {...Object} value arguments array of objects
         */
        unshift(value: T): void;
    
        /**
         * Add one or more objects to the end of the sequence.
         *
         * @method push
         * @param {...Object} value arguments array of objects
         */
        push(value: T): void;
        /**
         * Remove objects from the sequence
         *
         * @method splice
         * @param {Number} index starting index for removal
         * @param {Number} howMany how many elements to remove
         * @param {...Object} value arguments array of objects
         */
        splice(index: number, howMany: number): void;
        /**
         * Exchange this element's sequence position with another's.
         *
         * @method swap
         * @param {ViewSequence} other element to swap with.
         */
        swap(other: ViewSequence<T>): void;
       /**
         * Return value of this ViewSequence node.
         *
         * @method get
         * @return {Object} value of thiss
         */
        get(): T;
    
       /**
         * Call getSize() on the contained View.
         *
         * @method getSize
         * @return {Array.Number} [width, height]
         */
        getSize(): fms.Size;
    
        render(): fms.IRenderSpec;
    
    }

    export = ViewSequence;
}


declare module "famous/inputs/Accumulator" {
    import Transitionable = require('famous/transitions/Transitionable');

    /**
     * Accumulates differentials of event sources that emit a `delta`
     *  attribute taking a Number or Array of Number types. The accumulated
     *  value is stored in a getter/setter.
     * Generic parameter T is a Number or an Array of Numbers
     *
     */
    class Accumulator<T>{
        constructor (value: T                  , eventName?: string);
        constructor (value: Transitionable<T>  , eventName?: string);
    
        /**
         * Basic getter
         */
        get(): T; 
    
        /**
         * Basic setter
         */
        set(value: T): void;

    }
    export = Accumulator;
}


/**
 * if the device has touch support, then 
 * stops propagation of the events 'mousedown', 'mousemove', 'mouseup', 'mouseleave'
 */
declare module "famous/inputs/DesktopEmulationMode" {
}


/**
 * FastClick is an override shim which maps event pairs of
 *   'touchstart' and 'touchend' which differ by less than a certain
 *   threshold to the 'click' event.
 *   This is used to speed up clicks on some browsers.
 */
declare module "famous/inputs/FastClick" {
}





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





declare module fms {
    interface MouseEvent{
        /** delta is ether an array of 2 numbers or a number */
        delta    : any;
        position : any;
        velocity : any; 
        clientX  : number;
        clientY  : number;
        offsetX  : number;
        offsetY  : number;
    }
    
    interface IMouseSyncOption extends fms.IScalable{
         /** read from a particular axis, default is undefined*/
        direction?: number;
         /** read from axis with greatest differential, default is false */
        rails?: boolean;
         /** add listened to document on mouseleave, default is true */
        propogate?: boolean;
    }
    

}



declare module "famous/inputs/MouseSync" {
    
    import EventHandler = require('famous/core/EventHandler');
    
    // MouseSync not extends  EventHandler, but EventHandler is mixin

    /**
     * Handles piped in mouse drag events. Outputs an fms.MouseEvent instance with two
     *   properties, position and velocity.
     *   Emits 'start', 'update' and 'end' events with DOM event passthroughs,
     *   with position, velocity, and a delta key.
     */
    class MouseSync extends EventHandler{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
        constructor (options?: fms.IMouseSyncOption);
        
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IMouseSyncOption;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IMouseSyncOption): void; 

    //   on (type:"update", handler: (event:IPayload) => void);
    }
    export = MouseSync;
}




declare module fms {
    interface PinchEvent{
        /** the event count (only by start event) */ 
        count?: number;
        /** the center of the pinch event*/ 
        center: fms.Point2d;
        /** the two touch-identifier */ 
        touches: number[];
        /** the current distance */ 
        distance: number;
        /** the delta of the pinch event (only by update event) */ 
        delta? : number;
        /** the velocity of the pinch event (only by update event) */ 
        velocity? : number;
        displacement? : number;
    }
}

declare module "famous/inputs/PinchSync" {

    import TwoFingerSync = require('famous/inputs/TwoFingerSync');
    
    /**
     * Handles piped in two-finger touch events to change position via pinching / expanding.
     *   Emits 'start', 'update' and 'end' events with
     *   position, velocity, touch ids, and distance between fingers.
     */
    class PinchSync extends TwoFingerSync{
        constructor (options?: fms.IScalable);
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IScalable;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IScalable): void; 

    }

    export = PinchSync;
}




declare module fms {
    interface RotateEvent{
        /** the event count (only by start event) */ 
        count?: number;
        /** the delta of the rotate event  (only by update event) */ 
        delta? : number;
        /** the velocity of the rotate event   (only by update event) */ 
        velocity?: number;
        /** the ange  of the rotate event*/ 
        angle: number;
        /** the center of the rotate event*/ 
        center: fms.Point2d;
        /** the two touch-identifier */ 
        touches: number[];
    }
}

declare module "famous/inputs/RotateSync" {

    import TwoFingerSync = require('famous/inputs/TwoFingerSync');
    
    /**
     * Helper to PinchSync, RotateSync, and ScaleSync.  Generalized handling of
     *   two-finger touch events.
     *   This class is meant to be overridden and not used directly.
     */
    class RotateSync extends TwoFingerSync{
        constructor (options?: fms.IScalable);
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IScalable;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IScalable): void; 

    }

    export = RotateSync;
}




declare module fms {
    interface ScaleEvent{
        /** the event count (only by start event) */ 
        count?: number;
        /** the center of the scale event*/ 
        center: fms.Point2d;
        /** the two touch-identifier */ 
        touches: number[];
        /** the current distance */ 
        distance: number;
        /** the delta of the scale event (only by update event) */ 
        delta? : number;
        /** the velocity of the scale event (only by update event) */ 
        velocity? : number;
        /** the scale factor if the scale event (only by update event) */ 
        scale? : number;
    }
}



declare module "famous/inputs/ScaleSync" {

    import TwoFingerSync = require('famous/inputs/TwoFingerSync');
    
    /**
     * Handles piped in two-finger touch events to increase or decrease scale via pinching / expanding.
     *   Emits 'start', 'update' and 'end' events an object with position, velocity, touch ids, distance, and scale factor.
     *   Useful for determining a scaling factor from initial two-finger touch.
     */
    class ScaleSync extends TwoFingerSync{
        constructor (options?: fms.IScalable);
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IScalable;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IScalable): void; 

    }

    export = ScaleSync;
}





declare module fms {

    interface IScrollSyncOption{
         /** Pay attention to x changes (ScrollSync.DIRECTION_X), y changes (ScrollSync.DIRECTION_Y) or both (undefined) */
        direction?: number;
         /** End speed calculation floors at this number, in pixels per ms */
        minimumEndSpeed?: number;
         /** read from axis with greatest differential, default is false */
        rails?: boolean;
         /** scale outputs in by scalar or pair of scalars */
        scale?: any; // Number | Array.Number
        /** reset time for velocity calculation in ms */
        stallTime?: number;
    }
}



declare module "famous/inputs/ScrollSync" {
    
    import EventHandler = require('famous/core/EventHandler');
    
    // ScrollSync not extends  EventHandler, but EventHandler is mixin

    /**
     * Handles piped in mousewheel events.
     *   Emits 'start', 'update', and 'end' events with payloads including:
     *   delta: change since last position,
     *   position: accumulated deltas,
     *   velocity: speed of change in pixels per ms,
     *   slip: true (unused).
     *
     *   Can be used as delegate of GenericSync.
     */
    class ScrollSync extends EventHandler{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
        constructor (options?: fms.IScrollSyncOption);
        
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IScrollSyncOption;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IScrollSyncOption): void; 

    //   on (type:"update", handler: (event:IPayload) => void);
    }
    export = ScrollSync;
}






declare module "famous/inputs/TouchSync" {

    import EventHandler = require('famous/core/EventHandler');
    
    /**
     * Handles piped in touch events. Emits 'start', 'update', and 'events'
     *   events with position, velocity, acceleration, and touch id.
     *   Useful for dealing with inputs on touch devices.
     */
    class TouchSync extends EventHandler{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
        constructor (options?: fms.IMouseSyncOption);
        
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IMouseSyncOption;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IMouseSyncOption): void; 

    //   on (type:"update", handler: (event:IPayload) => void);
    }
    export = TouchSync;
}



declare module fms {
    interface TouchTrackEvent{
        x: number;
        y: number;
        identifier : number;
        origin?: any;
        timestamp: number
        count: number;
        history: TouchTrackEvent;
    }
}


declare module "famous/inputs/TouchTracker" {
    import Transitionable = require('famous/transitions/Transitionable');

    /**
     * Helper to TouchSync – tracks piped in touch events, organizes touch
     *   events by ID, and emits track events back to TouchSync.
     *   Emits 'trackstart', 'trackmove', and 'trackend' events upstream.
     *
     */
    class TouchTracker{
        /**
         * @param selective if false, save state for each touch.
         */
        constructor (selective: boolean);

    }
    export = TouchTracker;
}



declare module "famous/inputs/TwoFingerSync" {

    import EventHandler = require('famous/core/EventHandler');
    
    // TwoFingerSync not extends  EventHandler, but EventHandler is mixin
    /**
     * Helper to PinchSync, RotateSync, and ScaleSync.  Generalized handling of
     *   two-finger touch events.
     *   This class is meant to be overridden and not used directly.
     */
    class TwoFingerSync extends EventHandler{
    }

    export = TwoFingerSync;
}




declare module "famous/math/Matrix" {
    import Vector = require('famous/math/Vector');

    /**
     * A library for using a 3x3 numerical matrix, represented as a two-level array.
     */
    class Matrix{
        
        /**
         * A library for using a 3x3 numerical matrix, represented as a two-level array.
         * @param {Array.Array} values array of rows
         */
        constructor (values?: number[][]);
        /**
         * Return the values in the matrix as an array of numerical row arrays
         */
        get(): number[][];
    
        /**
         * Set the nested array of rows in the matrix.
         */
        set(values: number[][]): void;
    
        /**
         * Take this matrix as A, input vector V as a column vector, and return matrix product (A)(V).
         *   Note: This sets the internal vector register.  Current handles to the vector register
         *   will see values changed.
         *
         * @method vectorMultiply
         *
         * @param {Vector} v input vector V
         * @return {Vector} result of multiplication, as a handle to the internal vector register
         */
        vectorMultiply(v: Vector): Vector;
    
        /**
         * Multiply the provided matrix M2 with this matrix.  Result is (this) * (M2).
         *   Note: This sets the internal matrix register.  Current handles to the register
         *   will see values changed.
         */
        multiply(M2: Matrix): Matrix;
    
        /**
         * Creates a Matrix which is the transpose of this matrix.
         *   Note: This sets the internal matrix register.  Current handles to the register
         *   will see values changed.
         *
         * @method transpose
         *
         * @return {Matrix} result of transpose, as a handle to the internal register
         */
        transpose(): Matrix;
    
        /**
         * Clones the matrix
         */
        clone(): Matrix;
    }
    
    export = Matrix;
}




declare module "famous/math/Utilities" {

    class Utilities {
        /**
         * Constrain input to range.
         */
        static clamp(value: number, range: fms.Range): number;
    
        /**
         * Euclidean length of numerical array.
         */
        static length(array: number[]): number;
    }

    export = Utilities;
}




declare module fms { 
    module math{
        export interface Vector{
            /**
             * Add this element-wise to another Vector, element-wise.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @param {Vector} v addend
             * @return {Vector} vector sum
             */
            add(v: fms.math.Vector): fms.math.Vector;
        
            /**
             * Subtract another vector from this vector, element-wise.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @param {Vector} v subtrahend
             */
            sub(v: fms.math.Vector): fms.math.Vector;
        
            /**
             * Scale Vector by floating point r.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method mult
             *
             * @param {number} r scalar
             * @return {Vector} vector result
             */
            mult(r: number): fms.math.Vector;
        
            /**
             * Scale Vector by floating point 1/r.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method div
             *
             * @param {number} r scalar
             * @return {Vector} vector result
             */
            div(r: number): fms.math.Vector;
        
            /**
             * Given another vector v, return cross product (v)x(this).
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method cross
             * @param {Vector} v Left Hand Vector
             * @return {Vector} vector result
             */
            cross(v: fms.math.Vector): fms.math.Vector;
            /**
             * Component-wise equality test between this and Vector v.
             * @method equals
             * @param {Vector} v vector to compare
             * @return {boolean}
             */
            equals(v: fms.math.Vector): boolean;
        
            /**
             * Rotate clockwise around x-axis by theta radians.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method rotateX
             * @param {number} theta radians
             * @return {Vector} rotated vector
             */
            rotateX(theta: number): fms.math.Vector;
            /**
             * Rotate clockwise around y-axis by theta radians.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method rotateY
             * @param {number} theta radians
             * @return {Vector} rotated vector
             */
            rotateY(theta: number): fms.math.Vector;
        
            /**
             * Rotate clockwise around z-axis by theta radians.
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method rotateZ
             * @param {number} theta radians
             * @return {Vector} rotated vector
             */
            rotateZ(theta: number): fms.math.Vector;
        
            /**
             * Return dot product of this with a second Vector
             * @method dot
             * @param {Vector} v second vector
             * @return {number} dot product
             */
            dot(v: fms.math.Vector): number;
        
            /**
             * Return squared length of this vector
             * @method normSquared
             * @return {number} squared length
             */
            normSquared(): number;
        
            /**
             * Return length of this vector
             * @method norm
             * @return {number} length
             */
            norm(): number;
        
            /**
             * Scale Vector to specified length.
             *   If length is less than internal tolerance, set vector to [length, 0, 0].
             *   Note: This sets the internal result register, so other references to that vector will change.
             * @method normalize
             *
             * @param {number} length target length, default 1.0
             * @return {Vector}
             */
            normalize(length?: number): fms.math.Vector;
            /**
             * Make a separate copy of the Vector.
             * @method clone
             * @return {Vector}
             */
            clone(): fms.math.Vector;
            /**
             * True if and only if every value is 0 (or falsy)
             *
             * @method isZero
             *
             * @return {boolean}
             */
            isZero(): boolean;
        
        
        
            /**
             * Set this Vector to the values in the provided Array or Vector.
             *
             * @method set
             * @param {object} v array, Vector, or number
             * @return {Vector} this
             */
            set(v: fms.Vector3): fms.math.Vector;
            set(v: fms.math.Vector): fms.math.Vector;
            set(n: number): fms.math.Vector;
        
            /**
             * Put result of last internal register calculation in specified output vector.
             *
             * @method put
             * @param {Vector} v destination vector
             * @return {Vector} destination vector
             */
        
            put(v: fms.math.Vector): fms.math.Vector;
        
            /**
             * Set this vector to [0,0,0]
             *
             * @method clear
             */
            clear(): void;
        
            /**
             * Scale this Vector down to specified "cap" length.
             *   If Vector shorter than cap, or cap is Infinity, do nothing.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method cap
             * @return {Vector} capped vector
             */
            cap(cap: number): fms.math.Vector;
        
            /**
             * Return projection of this Vector onto another.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method project
             * @param {Vector} n vector to project upon
             * @return {Vector} projected vector
             */
            project(n: fms.math.Vector): fms.math.Vector;
        
            /**
             * Reflect this Vector across provided vector.
             *   Note: This sets the internal result register, so other references to that vector will change.
             *
             * @method reflectAcross
             * @param {Vector} n vector to reflect across
             * @return {Vector} reflected vector
             */
            reflectAcross(n: fms.math.Vector): fms.math.Vector;
        
            /**
             * Convert Vector to three-element array.
             *
             * @method get
             * @return {array<number>} three-element array
             */
            get(): fms.Vector3;
        
            get1D(): number;
        }
    }
    interface IPositioned {
        position: fms.math.Vector;
    }
}
declare module "famous/math/Vector" {

    class Vector implements fms.math.Vector{
        /**
         * Three-element floating point vector.
         *
         * @class Vector
         * @constructor
         */
        constructor (x: number, y: number, z: number );
    
        /**
         * Add this element-wise to another Vector, element-wise.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @param {Vector} v addend
         * @return {Vector} vector sum
         */
        add(v: Vector): Vector;
    
        /**
         * Subtract another vector from this vector, element-wise.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @param {Vector} v subtrahend
         */
        sub(v: Vector): Vector;
    
        /**
         * Scale Vector by floating point r.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method mult
         *
         * @param {number} r scalar
         * @return {Vector} vector result
         */
        mult(r: number): Vector;
    
        /**
         * Scale Vector by floating point 1/r.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method div
         *
         * @param {number} r scalar
         * @return {Vector} vector result
         */
        div(r: number): Vector;
    
        /**
         * Given another vector v, return cross product (v)x(this).
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method cross
         * @param {Vector} v Left Hand Vector
         * @return {Vector} vector result
         */
        cross(v: Vector): Vector;
        /**
         * Component-wise equality test between this and Vector v.
         * @method equals
         * @param {Vector} v vector to compare
         * @return {boolean}
         */
        equals(v: Vector): boolean;
    
        /**
         * Rotate clockwise around x-axis by theta radians.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method rotateX
         * @param {number} theta radians
         * @return {Vector} rotated vector
         */
        rotateX(theta: number): Vector;
        /**
         * Rotate clockwise around y-axis by theta radians.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method rotateY
         * @param {number} theta radians
         * @return {Vector} rotated vector
         */
        rotateY(theta: number): Vector;
    
        /**
         * Rotate clockwise around z-axis by theta radians.
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method rotateZ
         * @param {number} theta radians
         * @return {Vector} rotated vector
         */
        rotateZ(theta: number): Vector;
    
        /**
         * Return dot product of this with a second Vector
         * @method dot
         * @param {Vector} v second vector
         * @return {number} dot product
         */
        dot(v: Vector): number;
    
        /**
         * Return squared length of this vector
         * @method normSquared
         * @return {number} squared length
         */
        normSquared(): number;
    
        /**
         * Return length of this vector
         * @method norm
         * @return {number} length
         */
        norm(): number;
    
        /**
         * Scale Vector to specified length.
         *   If length is less than internal tolerance, set vector to [length, 0, 0].
         *   Note: This sets the internal result register, so other references to that vector will change.
         * @method normalize
         *
         * @param {number} length target length, default 1.0
         * @return {Vector}
         */
        normalize(length?: number): Vector;
        /**
         * Make a separate copy of the Vector.
         * @method clone
         * @return {Vector}
         */
        clone(): Vector;
        /**
         * True if and only if every value is 0 (or falsy)
         *
         * @method isZero
         *
         * @return {boolean}
         */
        isZero(): boolean;
    
    
    
        /**
         * Set this Vector to the values in the provided Array or Vector.
         *
         * @method set
         * @param {object} v array, Vector, or number
         * @return {Vector} this
         */
        set(v: fms.Vector3): Vector;
        set(v: Vector): Vector;
        set(n: number): Vector;
    
        /**
         * Put result of last internal register calculation in specified output vector.
         *
         * @method put
         * @param {Vector} v destination vector
         * @return {Vector} destination vector
         */
    
        put(v: Vector): Vector;
    
        /**
         * Set this vector to [0,0,0]
         *
         * @method clear
         */
        clear(): void;
    
        /**
         * Scale this Vector down to specified "cap" length.
         *   If Vector shorter than cap, or cap is Infinity, do nothing.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method cap
         * @return {Vector} capped vector
         */
        cap(cap: number): Vector;
    
        /**
         * Return projection of this Vector onto another.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method project
         * @param {Vector} n vector to project upon
         * @return {Vector} projected vector
         */
        project(n: Vector): Vector;
    
        /**
         * Reflect this Vector across provided vector.
         *   Note: This sets the internal result register, so other references to that vector will change.
         *
         * @method reflectAcross
         * @param {Vector} n vector to reflect across
         * @return {Vector} reflected vector
         */
        reflectAcross(n: Vector): Vector;
    
        /**
         * Convert Vector to three-element array.
         *
         * @method get
         * @return {array<number>} three-element array
         */
        get(): fms.Vector3;
    
        get1D(): number;
    }

    export = Vector;
}


declare module "famous/core/EventArbiter" {
    
    import EventHandler = require('famous/core/EventHandler');

    /**
     * A switch which wraps several event destinations and
     *  redirects received events to at most one of them.
     *  Setting the 'mode' of the object dictates which one
     *  of these destinations will receive events.
     */
    class EventArbiter  {
        /**
         * constructor
         * @param {Number | string} startMode initial setting of switch
         */
        constructor (startMode: string);
        constructor (startMode: number);
    
        /**
         * Set switch to this mode, passing events to the corresponding
         *   EventHandler.  If mode has changed, emits 'change' event,
         *   emits 'unpipe' event to the old mode's handler, and emits 'pipe'
         *   event to the new mode's handler.
         *
         * @param {string | number} mode indicating which event handler to send to.
         */
        setMode(mode: string): void;
        setMode(mode: number): void;
    
        /**
         * Return the existing EventHandler corresponding to this
         *   mode, creating one if it doesn't exist.
         * @return {EventHandler} eventHandler corresponding to this mode
         */
        forMode(mode: string): EventHandler;
        forMode(mode: number): EventHandler;
    
        /**
         * Trigger an event, sending to currently selected handler, if
         * it is listening for provided 'type' key.
         * @param eventType event type key (for example, 'click')
         * @param event event data
         */
        emit(eventType: string, event?: any): void;
    }
    export = EventArbiter;
}


declare module "famous/core/EventFilter" {
    
    import EventHandler = require('famous/core/EventHandler');

    /**
     * EventFilter regulates the broadcasting of events based on
     *  a specified condition function of standard event type: function(type, data).
     */
    class EventFilter extends EventHandler {
        /**
         * @param condition function to determine whether or not events are emitted.
         */
        constructor (condition: (type: string, event?: any) => boolean);
    }
    export = EventFilter;
}


declare module fms {
   /**
    * IEventMappingFunction returns a event emitter to determine where events are routed to.
    * if return null the event will not propagated. 
    */
   interface IEventMappingFunction { 
      (type: string, event?: any): fms.IEventEmitter; 
   }        
}


declare module "famous/core/EventMapper" {
    
    import EventHandler = require('famous/core/EventHandler');

    /**
     * EventMapper routes events to various event destinations
     *  based on custom logic.  The function signature is arbitrary.
     * @param {function} mappingFunction function to determine where
     *  events are routed to.
     */
    class EventMapper extends EventHandler {
        /**
         * mappingFunction function to determine where events are routed to.
         */
        constructor (mappingFunction: fms.IEventMappingFunction);
    }
    export = EventMapper;
}




declare module fms {
    interface IDraggableOptions {
        /** grid width for snapping during drag. default: 1 */
        snapX?       : number;
        /** grid height for snapping during drag default: 0*/
        snapY?       : number;
        /** maxmimum [negative, positive] x displacement from start of drag */
        xRange?      : number[];
        /** maxmimum [negative, positive] y displacement from start of drag */
        yRange?      : number[];
        /** one pixel of input motion translates to this many pixels of output drag motion. default: 1 */
        scale?       : number;
        /** User should set to Draggable.DIRECTION_X or Draggable.DIRECTION_Y to constrain to one axis.*/
        projection?  : number;
    }
}
declare module "famous/modifiers/Draggable" {
    
    class Draggable implements fms.IModifier{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
    
        constructor  (options? : fms.IDraggableOptions); 
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IDraggableOptions): void;
        /**
         * Get current delta in position from where this draggable started.
         */
        getPosition(): fms.Point2d;
    
        /**
         * Transition the element to the desired relative position via provided transition.
         *  For example, calling this with [0,0] will not change the position.
         *  Callback will be executed on completion.
         *
         * @param {transition} transition transition object specifying how object moves to new position
         * @param {function} callback zero-argument function to call on observed completion
         */
        setRelativePosition(position: fms.Point2d, transition?: fms.ITransition     , callback?: () => void) : void;
        setRelativePosition(position: fms.Point2d, transition:  fms.INamedTransition, callback?: () => void) : void;
        setRelativePosition(position: fms.Point2d, transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Transition the element to the desired absolute position via provided transition.
         *  Callback will be executed on completion.
         *
         * @param {array<number>} position end state to which we interpolate
         * @param {transition} transition transition object specifying how object moves to new position
         * @param {function} callback zero-argument function to call on observed completion
         */
        setPosition(position: fms.Point2d, transition?: fms.ITransition     , callback?: () => void) : void;
        setPosition(position: fms.Point2d, transition:  fms.INamedTransition, callback?: () => void) : void;
        setPosition(position: fms.Point2d, transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Set this draggable to respond to user input.
         */
        activate(): void;
        /**
         * Set this draggable to ignore user input.
         */
        deactivate(): void;
        /**
         * Switch the input response stage between active and inactive.
         */
        toggle(): void;
    
        /**
         * Return render spec for this Modifier, applying to the provided
         *    target component.  This is similar to render() for Surfaces.
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
    
    }

   export = Draggable;
}




declare module fms {
    interface IFaderOptions {
        
        /** Stops returning affected renderables up the tree when they're fully faded when true. default: false */
        cull?: boolean;
        /** @param {Transition} [options.transition=true] The main transition for showing and hiding. default: true */
        transition: boolean;
        /** @param {Transition} [options.pulseInTransition=true] Controls the transition to a pulsed state when the Fader instance's pulse method is called. default: true */
        pulseInTransition: boolean; 
        /** @param {Transition} [options.pulseOutTransition=true]Controls the transition back from a pulsed state when the Fader instance's pulse method is called. default: true */
        pulseOutTransition: boolean;
    
    


    }
}

declare module "famous/modifiers/Fader" {
    
    class Fader implements fms.IModifier{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
    
        constructor  (options? : fms.IFaderOptions); 
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IFaderOptions): void;
        /**
         * Fully displays the Fader instance's associated renderables.
         * @param {Transition} [transition] The transition that coordinates setting to the new state.
         * @param {Function} [callback] A callback that executes once you've transitioned to the fully shown state.
         */
        show (transition?: fms.ITransition     , callback?: () => void) : void;
        show (transition:  fms.INamedTransition, callback?: () => void) : void;
        show (transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Fully fades the Fader instance's associated renderables.
         * @param {Transition} [transition] The transition that coordinates setting to the new state.
         * @param {Function} [callback] A callback that executes once you've transitioned to the fully faded state.
         */
        hide (transition?: fms.ITransition     , callback?: () => void) : void;
        hide (transition:  fms.INamedTransition, callback?: () => void) : void;
        hide (transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Manually sets the opacity state of the fader to the passed-in one. Executes with an optional
         * transition and callback.
         * @param {Number} state A number from zero to one: the amount of opacity you want to set to.
         * @param {Transition} [transition] The transition that coordinates setting to the new state.
         * @param {Function} [callback] A callback that executes once you've finished executing the pulse.
         */
        set (state: number, transition?: fms.ITransition     , callback?: () => void) : void;
        set (state: number, transition:  fms.INamedTransition, callback?: () => void) : void;
        set (state: number, transition:  fms.IFuncTransition , callback?: () => void) : void;
    
    
        /**
         * Halt the transition
         */
        halt(): void;
    
        /**
         * Tells you if your Fader instance is above its visibility threshold.
         */
        isVisible(): boolean;
    
        /**
         * Return render spec for this Modifier, applying to the provided
         *    target component.  This is similar to render() for Surfaces.
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
    
    }
    export = Fader;
}




declare module "famous/modifiers/ModifierChain" {
    
    /**
     * A class to add and remove a chain of modifiers
     *   at a single point in the render tree
     */
    class ModifierChain implements fms.IModifier{
        constructor  (...modifiers : fms.IModifier[]); 
        /**
         * Add a modifier, or comma separated modifiers, to the modifier chain.
         */
        addModifier(...modifiers : fms.IModifier[]): void;
    
        /**
         * Remove a modifier from the modifier chain.
         */
        removeModifier(modifiers : fms.IModifier): void;
        /**
         * Return render spec for this Modifier, applying to the provided
         *    target component.  This is similar to render() for Surfaces.
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
    
    }
    export = ModifierChain;
}




declare module fms {
    interface IStateModifierOptions {
       transform?: Matrix4x4;
       opacity?: number;
       origin?: Origin;
       align?: Origin;
       size?: Size;
    }
}
declare module "famous/modifiers/StateModifier" {
    
    class StateModifier implements fms.IModifier{
        constructor  (options? : fms.IStateModifierOptions); 
        /**
         * Set the transform matrix of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setTransform
         *
         * @param {Transform} transform Transform to transition to.
         * @param {Transitionable} [transition] Valid transitionable object
         * @param {Function} [callback] callback to call after transition completes
         * @return {StateModifier} this
         */
        setTransform(transform: fms.Matrix4x4, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setTransform(transform: fms.Matrix4x4, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setTransform(transform: fms.Matrix4x4, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
    
        /**
         * Set the opacity of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setOpacity
         *
         * @param {Number} opacity Opacity value to transition to.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setOpacity(opacity: number, transition?: fms.ITransition     , callback?: () => void): StateModifier;
        setOpacity(opacity: number, transition:  fms.INamedTransition, callback?: () => void): StateModifier;
        setOpacity(opacity: number, transition:  fms.IFuncTransition , callback?: () => void): StateModifier;
    
        /**
         * Set the origin of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setOrigin
         *
         * @param {Array.Number} origin two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setOrigin(origin: fms.Origin, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setOrigin(origin: fms.Origin, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setOrigin(origin: fms.Origin, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
        
        /**
         * Set the alignment of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setAlign
         *
         * @param {Array.Number} align two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setAlign(align: fms.Align, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setAlign(align: fms.Align, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setAlign(align: fms.Align, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
    
    
        /**
         * Set the size of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setSize
         *
         * @param {Array.Number} size two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setSize(size: fms.Size, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setSize(size: fms.Size, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setSize(size: fms.Size, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
        /**
         * Stop the transition.
         */
        halt(): void;
        /**
         * Get the current state of the transform matrix component.
         * @return {Object} transform provider object
         */
        getTransform(): fms.Matrix4x4;
    
        /**
         * Get the destination state of the transform component.
         * @return {Transform} transform matrix
         */
        getFinalTransform(): fms.Matrix4x4;
    
        /**
         * Get the current state of the opacity component.
         * @return {Object} opacity provider object
         */
        getOpacity(): number;
    
        /**
         * Get the current state of the origin component.
         * @return {Object} origin provider object
         */
        getOrigin(): fms.Origin;
    
        /**
         * Get the current state of the align component.
         */
        getAlign(): fms.Origin; 
        /**
         * Get the current state of the size component.
         */
        getSize(): fms.Size;
         /**
         * modifies the render spec
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
    
    }

   export = StateModifier;
}





declare module fms.physic {
    interface IAgent{
            
    }
    interface IPhysicsEngineOptions{
        /**
         * The number of iterations the engine takes to resolve constraints
         * @attribute constraintSteps
         * @type Number
         */
        constraintSteps? : number;

        /**
         * The energy threshold before the Engine stops updating
         * @attribute sleepTolerance
         * @type Number
         */
        sleepTolerance? : number;
    }
}

declare module "famous/physics/PhysicsEngine" {
    
    import Vector = require('famous/math/Vector');
    import Particle = require('famous/physics/bodies/Particle');
    import Body = require('famous/physics/bodies/Body');
    
    class PhysicsEngine {
        constructor  (options?: fms.physic.IPhysicsEngineOptions); 
        
        /**
         * Options setter
         * @method setOptions
         * @param options {Object}
         */
        public setOptions(opts: fms.physic.IPhysicsEngineOptions): void;
        /**
         * Method to add a physics body to the engine. Necessary to update the
         * body over time.
         *
         */
        addBody<P extends Particle> (particle: P): P;
    
        /**
         * Remove a body from the engine. Detaches body from all forces and
         * constraints.
         */
        removeBody (particle: Particle): void;
        /**
         * Attaches a force or constraint to a Body. Returns an AgentId of the
         * attached agent which can be used to detach the agent.
         *
         * @method attach
         * @param agent {Agent|Array.Agent} A force, constraint, or array of them.
         * @param [targets=All] {Body|Array.Body} The Body or Bodies affected by the agent
         * @param [source] {Body} The source of the agent
         * @return AgentId {Number}
         */
        attach(agents: fms.physic.IAgent, targets: Particle[], source?: Particle): number;
        attach(agents: fms.physic.IAgent[], targets: Particle[], source?: Particle): number[];
    
        /**
         * Append a body to the targets of a previously defined physics agent.
         *
         * @method attachTo
         * @param agentID {AgentId} The agentId of a previously defined agent
         * @param target {Body} The Body affected by the agent
         */
        attachTo(agentID: number, target: Particle): void;
    
        /**
         * Undoes PhysicsEngine.attach. Removes an agent and its associated
         * effect on its affected Bodies.
         *
         * @method detach
         * @param agentID {AgentId} The agentId of a previously defined agent
         */
        detach(id: number): void;
        /**
         * Remove a single Body from a previously defined agent.
         *
         * @method detach
         * @param agentID {AgentId} The agentId of a previously defined agent
         * @param target {Body} The body to remove from the agent
         */
        detachFrom(id: number, target: Body): void;
        /**
         * A convenience method to give the Physics Engine a clean slate of
         * agents. Preserves all added Body objects.
         *
         * @method detachAll
         */
        detachAll(): void;
    
        /**
         * Returns the corresponding agent given its agentId.
         *
         * @method getAgent
         * @param id {AgentId}
         */
        getAgent(id: number): fms.physic.IAgent;
    
        /**
         * Returns all particles that are currently managed by the Physics Engine.
         *
         * @method getParticles
         * @return particles {Array.Particles}
         */
        getParticles(): Particle[];
    
        /**
         * Returns all bodies, except particles, that are currently managed by the Physics Engine.
         *
         * @method getBodies
         * @return bodies {Array.Bodies}
         */
        getBodies(): Body[];
    
        /**
         * Returns all bodies that are currently managed by the Physics Engine.
         *
         * @method getBodies
         * @return bodies {Array.Bodies}
         */
        getParticlesAndBodies(): Particle[];
    
        /**
         * Iterates over every Particle and applies a function whose first
         * argument is the Particle
         *
         * @method forEachParticle
         * @param fn {Function} Function to iterate over
         * @param [dt] {Number} Delta time
         */
        forEachParticle(fn: (p: Particle, dt?: number)=>void, dt?: number): void;
    
        /**
         * Iterates over every Body that isn't a Particle and applies
         * a function whose first argument is the Body
         *
         * @method forEachBody
         * @param fn {Function} Function to iterate over
         * @param [dt] {Number} Delta time
         */
        forEachBody(fn: (b: Body, dt?: number)=>void, dt?: number): void;
    
        /**
         * Iterates over every Body and applies a function whose first
         * argument is the Body
         *
         * @method forEach
         * @param fn {Function} Function to iterate over
         * @param [dt] {Number} Delta time
         */
        forEach(fn: (p: Particle, dt?: number)=>void, dt?: number): void;
        /**
         * Calculates the kinetic energy of all Body objects and potential energy
         * of all attached agents.
         *
         * TODO: implement.
         * @method getEnergy
         * @return energy {Number}
         */
        getEnergy(): number;
    
        /**
         * Updates all Body objects managed by the physics engine over the
         * time duration since the last time step was called.
         *
         * @method step
         */
        step(): void;
        /**
         * Tells whether the Physics Engine is sleeping or awake.
         * @method isSleeping
         * @return {Boolean}
         */
        isSleeping() : boolean;
    
        /**
         * Stops the Physics Engine from updating. Emits an 'end' event.
         * @method sleep
         */
        sleep(): void;
    
        /**
         * Starts the Physics Engine from updating. Emits an 'start' event.
         * @method wake
         */
        wake(): void; 
    
        emit(type: string, data: any): void;
        on(type: 'start', fn: (e : PhysicsEngine) => void): void;
        on(type: 'end', fn: (e : PhysicsEngine) => void): void;
        on(type: string, fn: (event: any) => void): void;
    }
    export = PhysicsEngine;
}


declare module "famous/surfaces/CanvasSurface" {

    import Surface = require('famous/core/Surface');
    
    class CanvasSurface extends Surface {
        constructor  (options?: fms.ISurfaceOption1); 
        constructor  (options: fms.ISurfaceOption2); 
        /**
         * Set content URL.  This will cause a re-rendering.
         * @param CanvasUrl
         */
         setContent(CanvasUrl: string): void;
        /**
         * Returns the canvas element's context
         * @param {string} contextId context identifier example '2d'
         */
         getContext(contextId: '2d'): CanvasRenderingContext2D;
         getContext(contextId: string): any;
    
    
        /**
         *  Set the size of the surface and canvas element.
         *
         *  @method setSize
         *  @param {Array.number} size [width, height] of surface
         *  @param {Array.number} canvasSize [width, height] of canvas surface
         */
        setSize (size: fms.Size, canvasSize: fms.Size): void;
    }

   export = CanvasSurface;
}






declare module "famous/surfaces/ContainerSurface" {

    import Surface = require('famous/core/Surface');
    import RenderNode = require('famous/core/RenderNode');
    
    class ContainerSurface extends Surface {
        constructor  (options?: fms.ISurfaceOption1);
        constructor  (options: fms.ISurfaceOption2);
        add (renderable: fms.IRenderable): RenderNode;
    }
   export = ContainerSurface;
}



declare module "famous/surfaces/FormContainerSurface" {

    import ContainerSurface = require('famous/surfaces/ContainerSurface');

    class FormContainerSurface extends ContainerSurface {
        constructor  (options?: fms.ISurfaceOption1);
        constructor  (options: fms.ISurfaceOption2);
    }
   export = FormContainerSurface;
}

declare module "famous/surfaces/ImageSurface" {
    import Surface = require('famous/core/Surface');
    
    class ImageSurface extends Surface {
        constructor  (options?: fms.ISurfaceOption1); 
        constructor  (options: fms.ISurfaceOption2); 
        /**
         * Set content URL.  This will cause a re-rendering.
         * @param imageUrl
         */
         setContent(imageUrl: string): void;
    }
    export = ImageSurface;
}



declare module fms {
    
    interface IInputSurfaceOption<SIZETYPE> extends ISurfaceOption<SIZETYPE>{
        /** placeholder text hint that describes the expected value of an <input> element */
        placeholder?: string; 
        /** specifies the type of element to display (e.g. 'datetime', 'text', 'button', etc.) */
        type?: string; 
        /** value of text */
        value?: string; 
    }
    
    interface IInputSurfaceOption1 extends IInputSurfaceOption<number> {}
    
    interface IInputSurfaceOption2 extends IInputSurfaceOption<boolean> {}
}

declare module "famous/surfaces/InputSurface" {
    
    import Surface = require('famous/core/Surface');

    /**
     * A Famo.us surface in the form of an HTML input element.
     * This extends the Surface class.
     */
    class InputSurface extends Surface {
        constructor  (options?: fms.IInputSurfaceOption1); 
        constructor  (options: fms.IInputSurfaceOption2); 
        /**
         * Set placeholder text.  Note: Triggers a repaint.
         * @param {string} str Value to set the placeholder to.
         * @return {InputSurface} this, allowing method chaining.
         */
        setPlaceholder(str: string) : InputSurface;
    
        /**
         * Focus on the current input, pulling up the keyboard on mobile.
         * @return {InputSurface} this, allowing method chaining.
         */
        focus() : InputSurface;
    
        /**
         * Blur the current input, hiding the keyboard on mobile.
         * @return {InputSurface} this, allowing method chaining.
         */
        blur(): InputSurface;
    
        /**
         * Set the value 
         *   Note: Triggers a repaint next tick.
         * @param {string} str Value to set the main input value to.
         * @return {InputSurface} this, allowing method chaining.
         */
        setValue(str: string): InputSurface;
    
        /**
         * Set the type of element to display conent.
         *   Note: Triggers a repaint next tick.
         * @param {string} str type of the input surface (e.g. 'button', 'text')
         * @return {InputSurface} this, allowing method chaining.
         */
        setType(str: string): InputSurface;
    
        /**
         * Get the value of the inner content of the element (e.g. the entered text)
         * @return {string} value of element
         */
        getValue(): string;
        /**
         * Set the name attribute of the element.
         *   Note: Triggers a repaint next tick.
         * @param {string} str element name
         * @return {InputSurface} this, allowing method chaining.
         */
        setName(str: string): InputSurface;
    
        /**
         * Get the name attribute of the element.
         * @return {string} name of element
         */
        getName(): string;
    
    }

   export = InputSurface;
}




declare module "famous/surfaces/SubmitInputSurface" {
    import InputSurface = require('famous/surfaces/InputSurface');
    
    class SubmitInputSurface extends InputSurface {
        constructor  (options?: fms.IInputSurfaceOption1); 
        constructor  (options: fms.IInputSurfaceOption2); 
    }
    export = SubmitInputSurface;
}



declare module fms {
    
    interface ITextareaSurfaceOption<SIZETYPE> extends ISurfaceOption<SIZETYPE>{
        /** placeholder text hint that describes the expected value of an <TextArea> element */
        placeholder?: string; 
        /** specifies the type of element to display (e.g. 'datetime', 'text', 'button', etc.) */
        type?: string; 
        /** value of text */
        value?: string; 
        /** specify 'hard' or 'soft' wrap for textarea */
        wrap?: string;
        /** number of columns in textarea */
        cols?: number;
        /** number of rows in textarea */
        rows?: number;
    }
    
    interface ITextareaSurfaceOption1 extends ITextareaSurfaceOption<number> {}
    
    interface ITextareaSurfaceOption2 extends ITextareaSurfaceOption<boolean> {}
}

declare module "famous/surfaces/TextareaSurface" {
    
    import Surface = require('famous/core/Surface');

    /**
     * A Famo.us surface in the form of an HTML TextArea element.
     * This extends the Surface class.
     */
    class TextareaSurface extends Surface {
        constructor  (options?: fms.ITextareaSurfaceOption1); 
        constructor  (options: fms.ITextareaSurfaceOption2); 
        /**
         * Set placeholder text.  Note: Triggers a repaint.
         * @param {string} str Value to set the placeholder to.
         * @return {TextareaSurface} this, allowing method chaining.
         */
        setPlaceholder(str: string) : TextareaSurface;
    
        /**
         * Focus on the current TextArea, pulling up the keyboard on mobile.
         * @return {TextareaSurface} this, allowing method chaining.
         */
        focus() : TextareaSurface;
    
        /**
         * Blur the current TextArea, hiding the keyboard on mobile.
         * @return {TextareaSurface} this, allowing method chaining.
         */
        blur(): TextareaSurface;
    
        /**
         * Set the value 
         *   Note: Triggers a repaint next tick.
         * @param {string} str Value to set the main TextArea value to.
         * @return {TextareaSurface} this, allowing method chaining.
         */
        setValue(str: string): TextareaSurface;
    
        /**
         * Set the type of element to display conent.
         *   Note: Triggers a repaint next tick.
         * @param {string} str type of the TextArea surface (e.g. 'button', 'text')
         * @return {TextareaSurface} this, allowing method chaining.
         */
        setType(str: string): TextareaSurface;
    
        /**
         * Get the value of the inner content of the element (e.g. the entered text)
         * @return {string} value of element
         */
        getValue(): string;
        /**
         * Set the name attribute of the element.
         *   Note: Triggers a repaint next tick.
         * @param {string} str element name
         * @return {TextareaSurface} this, allowing method chaining.
         */
        setName(str: string): TextareaSurface;
    
        /**
         * Get the name attribute of the element.
         * @return {string} name of element
         */
        getName(): string;

        /**
         * Set the wrap of textarea.
         *   Note: Triggers a repaint next tick.
         * @param {string} str wrap of the textarea surface (e.g. 'soft', 'hard')
         * @return {TextareaSurface} this, allowing method chaining.
         */
        setWrap(str: string): TextareaSurface;
    
        /**
         * Set the number of columns visible in the textarea.
         *   Note: Overridden by surface size; set width to true. (eg. size: [true, *])
         *         Triggers a repaint next tick.
         * @param {number} num columns in textarea surface
         * @return {TextareaSurface} this, allowing method chaining.
         */
        setColumns(num: number): TextareaSurface;

        /**
         * Set the number of rows visible in the textarea.
         *   Note: Overridden by surface size; set height to true. (eg. size: [*, true])
         *         Triggers a repaint next tick.
         *
         * @param {number} num rows in textarea surface
         * @return {TextareaSurface} this, allowing method chaining.
         */
        setRows(num: number): TextareaSurface;
    }

    export = TextareaSurface;
}




declare module fms {
    
    interface IVideoSurfaceOption<SIZETYPE> extends ISurfaceOption<SIZETYPE>{
        /** the size [width, height] in pixel */
        autoplay? : boolean;
    }
    
    interface IVideoSurfaceOption1 extends IVideoSurfaceOption<number> {}
    
    interface IVideoSurfaceOption2 extends IVideoSurfaceOption<boolean> {}
}

declare module "famous/surfaces/VideoSurface" {
    import Surface = require('famous/core/Surface');
    
    class VideoSurface extends Surface {
        constructor  (options?: fms.IVideoSurfaceOption1); 
        constructor  (options: fms.IVideoSurfaceOption2); 
        /**
         * Set content URL.  This will cause a re-rendering.
         * @param videoUrl
         */
         setContent(videoUrl: string): void;
        /**
         * Set internal options, overriding any default options
         *
         * @method setOptions
         *
         * @param {Object} [options] overrides of default options
         * @param {Boolean} [options.autoplay] HTML autoplay
         */
        setOptions(options: fms.IVideoSurfaceOption1): void;
        setOptions(options: fms.IVideoSurfaceOption2): void;
    }
    export = VideoSurface;
}




declare module "famous/transitions/CachedMap" {
    /**
     * A simple in-memory object cache.  Used as a helper for Views with
     * provider functions.
     */
    class CachedMap {
        /**
         * Creates a mapping function with a cache.
         * This is the main entrypoint for this object.
         * @static
         * @method create
         * @param {function} mappingFunction mapping
         * @return {function} memoized mapping function
         */
         public static create (mappingFunction: (n: number) => number): (n: number) => number;    
    }
    export = CachedMap;
}

declare module fms {
    interface IEasing{
        inQuad (t: number): number;
        outQuad (t: number): number;
        inOutQuad (t: number): number;
        inCubic (t: number): number;
        outCubic (t: number): number;
        inOutCubic (t: number): number;
        inQuart (t: number): number;
        outQuart (t: number): number;
        inOutQuart (t: number): number;
        inQuint (t: number): number;
        outQuint (t: number): number;
        inOutQuint (t: number): number;
        inSine (t: number): number;
        outSine (t: number): number;
        inOutSine (t: number): number;
        inExpo (t: number): number;
        outExpo (t: number): number;
        inOutExpo (t: number): number;
        inCirc (t: number): number;
        outCirc (t: number): number;
        inOutCirc (t: number): number;
        inElastic (t: number): number;
        outElastic (t: number): number;
        inOutElastic (t: number): number;
        inBack (t: number, s?: number): number;
        outBack (t: number, s?: number): number;
        inOutBack (t: number, s?: number): number;
        inBounce (t: number): number
        outBounce (t: number): number
        inOutBounce (t: number): number
    }
}



declare module "famous/transitions/Easing" {
    var Easing : fms.IEasing;
    export = Easing;
}



declare module "famous/transitions/MultipleTransition" {
    
    /**
     * Transition meta-method to support transitioning multiple
     *   values with scalar-only methods.
     */
    class MultipleTransition<T> {
        constructor  (method : new() => fms.ITransionable<T>);
        /**
         * Set the end states with a shared transition, with optional callback.
         */
        set (state:T[], namedTransition?: fms.INamedTransition, callback? : ()=>void): void;
        set (state:T[], funcTransition: fms.IFuncTransition, callback? : ()=>void): void;
        set (state:T[], transition: fms.ITransition, callback? : ()=>void): void;
        /**
         * Reset all transitions to start state.
         */
        reset (start:T[]): void; 
        /**
         * Get the state of each transition.
         */
        get () : T[];
    }

    export = MultipleTransition;
}




declare module fms {
    interface ISnapTransitionDef{
       period: number;
       dampingRation?: number;
       velocity?: number
    }
}

declare module "famous/transitions/SnapTransition" {
    /**
     * SnapTransition is a method of transitioning between two values (numbers,
     * or arrays of numbers). It is similar to SpringTransition except
     * the transition can be much faster and always has a damping effect.
     */
    class SnapTransition<T> implements fms.ITransionable<T>{
        /**
         * @param state Initial state
         */
        constructor (state? : T); 
        
            /**
         * Resets the state and velocity
         * @method reset
         */
        reset (state : T, velocity?: T) : void; 
        /**
         * Getter for velocity
         */
        getVelocity(): T;
    
        /**
         * Setter for velocity
         */
        setVelocity(velocity: T): void;

        /**
         * Detects whether a transition is in progress
         */
        isActive(): boolean;
    
        /**
         * Halt the transition
         */
        halt(): void;
    
        /**
         * Get the current position of the transition
         * @return state {Number|Array}
         */
        get(): T; 
    
        /**
         * Set the end position and transition, with optional callback on completion.
         * @param state {Number|Array}      Final state
         */
        set(state: T, definition: fms.ISnapTransitionDef, callback? : ()=>void): void
    }
    
    export = SnapTransition;
}




declare module fms {
    interface ISpringTransitionDef{
       period: number;
       dampingRation?: number;
       velocity?: number
    }
}

declare module "famous/transitions/SpringTransition" {
    /**
     * SnapTransition is a method of transitioning between two values (numbers,
     * or arrays of numbers). It is similar to SpringTransition except
     * the transition can be much faster and always has a damping effect.
     */
    class SpringTransition<T> implements fms.ITransionable<T> {
        /**
         * @param state Initial state
         */
        constructor (state? : T); 
        
            /**
         * Resets the state and velocity
         * @method reset
         */
        reset (state : T, velocity?: T) : void; 
        /**
         * Getter for velocity
         */
        getVelocity(): T;
    
        /**
         * Setter for velocity
         */
        setVelocity(velocity: T): void;

        /**
         * Detects whether a transition is in progress
         */
        isActive(): boolean;
    
        /**
         * Halt the transition
         */
        halt(): void;
    
        /**
         * Get the current position of the transition
         */
        get(): T;
    
        /**
         * Set the end position and transition, with optional callback on completion.
         */
        set(state: T, definition: fms.ISpringTransitionDef, callback? : ()=>void): void;
    }
    
   export = SpringTransition;
}



declare module "famous/transitions/Transitionable" {
    
    /**
     * A state maintainer for a smooth transition between
     *    numerically-specified states. Example numeric states include floats or
     *    Transform objects.
     *
     * An initial state is set with the constructor or set(startState). A
     *    corresponding end state and transition are set with set(endState,
     *    transition). Subsequent calls to set(endState, transition) begin at
     *    the last state. Calls to get(timestamp) provide the interpolated state
     *    along the way.
     *
     * Note that there is no event loop here - calls to get() are the only way
     *    to find state projected to the current (or provided) time and are
     *    the only way to trigger callbacks. Usually this kind of object would
     *    be part of the render() path of a visible component.
     *
     */
    class Transitionable<T> implements fms.ITransionable<T>{
        constructor  (start : T);
        static registerMethod (methodName:string, transitionClass:any): void;
        static unregisterMethod(methodName:string): void;
        /**
         * Add transition to end state to the queue of pending transitions. Special
         *    Use: calling without a transition resets the object to that state with
         *    no pending actions
         */
        set (state:T, namedTransition?: fms.INamedTransition, callback? : ()=>void): void;
        set (state:T, funcTransition: fms.IFuncTransition, callback? : ()=>void): void;
        set (state:T, transition: fms.ITransition, callback? : ()=>void): void;
        /**
         * Cancel all transitions and reset to a stable state
         */
        reset (start:T, startVelocity?: T): void; 
        /**
         * Add delay action to the pending action queue queue.
         * @param duration delay time (ms)
         */
        delay (duration: number, callback? : ()=>void): void;
    
        /**
         * Get interpolated state of current action at provided time. If the last
         *    action has completed, invoke its callback.
         */
        get () : T;
        /**
         * Is there at least one action pending completion?
         */
        isActive(): boolean;
        /**
         * Halt transition at current state and erase all pending actions.
         */
        halt (): void;
    }

    export = Transitionable;
}




declare module "famous/transitions/TransitionableTransform" {
    
    /**
     * A class for transitioning the state of a Transform by transitioning
     * its translate, scale, skew and rotate components independently.
     */
    class TransitionableTransform {
        
        constructor  (transform? : fms.Matrix4x4);
        /**
         * An optimized way of setting only the translation component of a Transform
         */
        setTranslate (translate: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setTranslate (translate: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setTranslate (translate: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * An optimized way of setting only the scale component of a Transform
         */
        setScale (scale: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setScale (scale: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setScale (scale: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * An optimized way of setting only the rotational component of a Transform
         * @param eulerAngles {Array}   Euler angles for new rotation state
         */
        setRotate(eulerAngles: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setRotate(eulerAngles: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setRotate(eulerAngles: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * An optimized way of setting only the skew component of a Transform
         */
        setSkew(skewAngles: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setSkew(skewAngles: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setSkew(skewAngles: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * Setter for a TransitionableTransform with optional parameters to transition
         * between Transforms
         */
        set(transform: fms.Matrix4x4, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        set(transform: fms.Matrix4x4, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        set(transform: fms.Matrix4x4, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * Sets the default transition to use for transitioning betwen Transform states
         */
        setDefaultTransition(namedTransition?: fms.INamedTransition): void;
        setDefaultTransition(funcTransition? : fms.IFuncTransition ): void;
        setDefaultTransition(transition?     : fms.ITransition     ): void;
    
        /**
         * Getter. Returns the current state of the Transform
         */
        get(): fms.Matrix4x4;
    
        /**
         * Get the destination state of the Transform
         */
        getFinal(): fms.Matrix4x4;

        /**
         * Is there at least one action pending completion?
         */
        isActive(): boolean;
        /**
         * Halt transition at current state and erase all pending actions.
         */
        halt (): void;
    }

    export = TransitionableTransform;
}




declare module fms {
    interface ITweenTransitionOptions{
        /** curve of the tween transition, default is TweenTransition.Curves.linear */
        curve?: fms.curveFunction;
        /** duration of the tween transition, default is 500ms */
        duration?: number;
        /** speed in pixels per ms considered only if positive */
        speed?: number;
    }
}

declare module "famous/transitions/TweenTransition" {
    /**
     * A state maintainer for a smooth transition between
     *    numerically-specified states.  Example numeric states include floats or
     *    Transfornm objects.
     *
     *    An initial state is set with the constructor or set(startValue). A
     *    corresponding end state and transition are set with set(endValue,
     *    transition). Subsequent calls to set(endValue, transition) begin at
     *    the last state. Calls to get(timestamp) provide the _interpolated state
     *    along the way.
     *
     *   Note that there is no event loop here - calls to get() are the only way
     *    to find out state projected to the current (or provided) time and are
     *    the only way to trigger callbacks. Usually this kind of object would
     *    be part of the render() path of a visible component.
     *    @param T could be number, FamousMatrix, Array.Number , Object.<number, number>
     */
    class TweenTransition<T> implements fms.ITransionable<T> {
        /**
         * Transition curves mapping independent variable t from domain [0,1] to a
         *    range within [0,1]. Includes functions 'linear', 'easeIn', 'easeOut',
         *    'easeInOut', 'easeOutBounce', 'spring'.
         */
        public static Curves: {
                linear: fms.curveFunction;
                easeIn: fms.curveFunction;
                easeOut: fms.curveFunction;
                easeInOut: fms.curveFunction;
                easeOutBounce: fms.curveFunction;
                spring: fms.curveFunction;
            }
        /**
         * Add "unit" curve to internal dictionary of registered curves.
         * @return {boolean} false if key is taken, else true
         */
        public static registerCurve(curveName: string, curve: fms.curveFunction): boolean;
        /**
         * Remove object with key "curveName" from internal dictionary of registered curves.
         * @return {boolean} false if key has no dictionary value
         */
        public static unregisterCurve(curveName: string): boolean;
    
        /**
         * Retrieve function with key "curveName" from internal dictionary of
         *    registered curves. Default curves are defined in the
         *    TweenTransition.Curves array, where the values represent
         *    unitCurve functions.
         * @return {unitCurve} curve function of one numeric variable mapping [0,1]
         *    to range inside [0,1]
         */
        public static getCurve(curveName: string):  fms.curveFunction;
        
            
        /**
         * Retrieve all available curves.
         * @return {object} curve functions of one numeric variable mapping [0,1]
         *    to range inside [0,1]
         */
        getCurves(): {[key: string]:  fms.curveFunction};

        /**
         * @param state Initial state
         */
        constructor (state? : T); 
        
    
        /**
         * Set internal options, overriding any default options.
         */
        setOptions(options: fms.ITweenTransitionOptions): void;
    
        /**
         * Add transition to end state to the queue of pending transitions. Special
         *    Use: calling without a transition resets the object to that state with
         *    no pending actions
         */
        set(endValue: T, transition: fms.ITweenTransitionOptions, callback? : ()=>void): void
    
        /**
         * Cancel all transitions and reset to a stable state
         */
        reset(startValue: T, startVelocity?: number): void;
        /**
         * Get current velocity
         * @returns {Number} velocity
         */
        getVelocity() : number;
    
        /**
         * Get interpolated state of current action at provided time. If the last
         *    action has completed, invoke its callback.
         *
         * @return {number|Object.<number|string, number>} beginning state
         *    _interpolated to this point in time.
         */
        get(timestamp?: number): T;
    
        /**
         * Is there at least one action pending completion?
         */
        isActive(): boolean;
    
        /**
         * Halt transition at current state and erase all pending actions.
         */
        halt(): void;
    }
    
    export = TweenTransition;
}




declare module fms {
    interface IWallTransitionDef{
       period: number;
       dampingRation?: number;
       velocity?: number;
      /**
       * The percentage of momentum transferred to the wall. default = 0.5
       */
       resitution : number;
    }
}

declare module "famous/transitions/WallTransition" {
    /**
     * WallTransition is a method of transitioning between two values (numbers,
     *   or arrays of numbers) with a bounce. Unlike a SpringTransition
     *   The transition will not overshoot the target, but bounce back against it.
     *   The behavior of the bounce is specified by the transition options.
     */
    class WallTransition<T> implements fms.ITransionable<T> {
        /**
         * @param state Initial state
         */
        constructor (state? : T); 
        
            /**
         * Resets the state and velocity
         * @method reset
         */
        reset (state : T, velocity?: T) : void; 
        /**
         * Getter for velocity
         */
        getVelocity(): T; 
    
        /**
         * Setter for velocity
         */
        setVelocity(velocity: T): void;

        /**
         * Detects whether a transition is in progress
         */
        isActive(): boolean;
    
        /**
         * Halt the transition
         */
        halt(): void;
    
        /**
         * Get the current position of the transition
         * @return state {Number|Array}
         */
        get(): T; 
    
        /**
         * Set the end position and transition, with optional callback on completion.
         */
        set(state: T, definition: fms.IWallTransitionDef, callback? : ()=>void): void
    }
    
    export = WallTransition;
}


declare module fms {
    interface KeyCodes{
        0 : number;
        1 : number;
        2 : number;
        3 : number;
        4 : number;
        5 : number;
        6 : number;
        7 : number;
        8 : number;
        9 : number;
        a : number;
        b : number;
        c : number;
        d : number;
        e : number;
        f : number;
        g : number;
        h : number;
        i : number;
        j : number;
        k : number;
        l : number;
        m : number;
        n : number;
        o : number;
        p : number;
        q : number;
        r : number;
        s : number;
        t : number;
        u : number;
        v : number;
        w : number;
        x : number;
        y : number;
        z : number;
        A : number;
        B : number;
        C : number;
        D : number;
        E : number;
        F : number;
        G : number;
        H : number;
        I : number;
        J : number;
        K : number;
        L : number;
        M : number;
        N : number;
        O : number;
        P : number;
        Q : number;
        R : number;
        S : number;
        T : number;
        U : number;
        V : number;
        W : number;
        X : number;
        Y : number;
        Z : number;
        ENTER : number;
        LEFT_ARROW: number;
        RIGHT_ARROW: number;
        UP_ARROW: number;
        DOWN_ARROW: number;
        SPACE: number;
        SHIFT: number;
        TAB: number;
    }
}

declare module "famous/utilities/KeyCodes" {
    var KeyCodes: fms.KeyCodes;
    export = KeyCodes;
}


declare module "famous/utilities/Timer" {
    /**
     * Wraps a function to be invoked after a certain amount of time.
     *  After a set duration has passed, it executes the function and
     *  removes it as a listener to 'prerender'.
     * @param {function} fn function to be run after a specified duration
     * @param {number} duration milliseconds from now to execute the function
     * @return {function} function passed in as parameter
     */
    export function setTimeout(fn: ()=>void, duration:number) : ()=>void;
    /**
     * Wraps a function to be invoked after a certain amount of time.
     *  After a set duration has passed, it executes the function and
     *  resets the execution time.
     * @param {function} fn function to be run after a specified duration
     * @param {number} duration interval to execute function in milliseconds
     * @return {function} function passed in as parameter
     */
    export function setInterval(fn: ()=>void, duration:number) : ()=>void;
    
    /**
     * Wraps a function to be invoked after a certain amount of prerender ticks.
     *  Similar use to setTimeout but tied to the engine's run speed.
     * @param {function} fn function to be run after a specified amount of ticks
     * @param {number} numTicks number of prerender frames to wait
     * @return {function} function passed in as parameter
     */
    export function after(fn: ()=>void, numTicks:number) : ()=>void;
    
    /**
     * Wraps a function to be continually invoked after a certain amount of prerender ticks.
     *  Similar use to setInterval but tied to the engine's run speed.
     * @method every
     * @param {function} fn function to be run after a specified amount of ticks
     * @param {number} numTicks number of prerender frames to wait
     * @return {function} function passed in as parameter
     */
    export function every(fn: ()=>void, numTicks:number) : ()=>void;
    /**
     * Remove a function that gets called every prerender
     * @param {function} fn event linstener
     */
    export function clear(fn: ()=>void): void;
    /**
     * Executes a function after a certain amount of time. Makes sure
     *  the function is not run multiple times.
     * @method debounce
     * @param {function} func function to run after certain amount of time
     * @param {number} wait amount of time
     * @return {function} function that is not able to debounce
     */
    export function debounce(fn: ()=>void, wait:number) : ()=>void;
}

interface IDirection {
    X:number;
    Y:number; 
    Z:number; 
}

interface IUtility {
    Direction:IDirection;
}

declare var Utility:IUtility;
declare module "famous/utilities/Utility" {
   export = Utility;
}





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



declare module fms {
    interface ILightboxOptions{
        inTransform: Matrix4x4;
        inOpacity: number;
        inOrigin: fms.Origin;
        outTransform: Matrix4x4;
        outOpacity: number;
        outOrigin: fms.Origin;
        showTransform: number;
        showOpacity: number;
        showOrigin: fms.Origin;
        inTransition: boolean;
        outTransition: boolean;
        overlap: boolean;
    }
}
    
declare module "famous/views/Lightbox" {
    
    /**
     * Lightbox, using transitions, shows and hides different renderables. Lightbox can essentially be
     * thought of as RenderController with a stateful implementation and interface.
     */
    class Lightbox implements fms.IRenderable{
        constructor  (options: fms.ILightboxOptions);
        /**
         * Patches the Lightbox instance's options with the passed-in ones.
         */
        setOptions(options: fms.ILightboxOptions): void;
    
        /**
         * Show displays the targeted renderable with a transition and an optional callback to
         *  execute afterwards.
         * @param {Object} renderable The renderable you want to show.
         * @param {Transition} [transition] Overwrites the default transition in to display the
         * passed-in renderable.
         * @param {function} [callback] Executes after transitioning in the renderable.
         */
        show(renderable: fms.IRenderable, transition: fms.ITransition     , callback?: ()=>void): void;
        show(renderable: fms.IRenderable, transition: fms.INamedTransition, callback?: ()=>void): void;
        show(renderable: fms.IRenderable, transition?: fms.IFuncTransition, callback?: ()=>void): void;
    
        /**
         * Hide hides the currently displayed renderable with an out transition.
         * @param {Transition} [transition] Overwrites the default transition in to hide the
         * currently controlled renderable.
         * @param {function} [callback] Executes after transitioning out the renderable.
         */
        hide (transition: fms.ITransition     , callback?: ()=>void): void;
        hide (transition: fms.INamedTransition, callback?: ()=>void): void;
        hide (transition?: fms.IFuncTransition, callback?: ()=>void): void;
    
        render() : fms.IRenderSpec;
    }

   export = Lightbox;
}








declare module fms {
    interface RenderControllerOptions{
      inTransition?: boolean;
      outTransition?: boolean;
      overlap?: boolean;
    }
}
declare module "famous/views/RenderController" {
    
    import View = require('famous/core/View');
    import Transitionable = require('famous/transitions/Transitionable');

    /**
     * A dynamic view that can show or hide different renerables with transitions.
     */
    class RenderController extends View<fms.RenderControllerOptions>{
    
       constructor  (options?: fms.RenderControllerOptions); 
        /**
         * As your RenderController shows a new renderable, it executes a transition in. This transition in
         *  will affect a default interior state and modify it as you bring renderables in and out. However, if you want to control
         *  the transform, opacity, and origin state yourself, you may call certain methods (such as inTransformFrom) to obtain state from an outside source,
         *  that may either be a function or a Famous transitionable. inTransformFrom sets the accessor for the state of
         *  the transform used in transitioning in renderables.
         *
         * @method inTransformFrom
         * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
         * a transitionable that manages a full transform (a sixteen value array).
         * @chainable
         */
        inTransformFrom(transform: Transitionable<fms.Matrix4x4>) :  RenderController;
    
        /**
         * inOpacityFrom sets the accessor for the state of the opacity used in transitioning in renderables.
         * @method inOpacityFrom
         * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
         * a transitionable that manages opacity (a number between zero and one).
         * @chainable
         */
        inOpacityFrom(opacity: Transitionable<number>) : RenderController;
    
        /**
         * inOriginFrom sets the accessor for the state of the origin used in transitioning in renderables.
         * @method inOriginFrom
         * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
         * a transitionable that manages origin (a two value array of numbers between zero and one).
         * @chainable
         */
        inOriginFrom(origin: Transitionable<fms.Origin>) : RenderController;
    
        /**
         * outTransformFrom sets the accessor for the state of the transform used in transitioning out renderables.
         * @method show
         * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
         * a transitionable that manages a full transform (a sixteen value array).
         * @chainable
         */
        outTransformFrom(transform: Transitionable<fms.Matrix4x4>) : RenderController;
    
        /**
         * outOpacityFrom sets the accessor for the state of the opacity used in transitioning out renderables.
         * @method inOpacityFrom
         * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
         * a transitionable that manages opacity (a number between zero and one).
         * @chainable
         */
        outOpacityFrom(opacity: Transitionable<number>) : RenderController;
    
        /**
         * outOriginFrom sets the accessor for the state of the origin used in transitioning out renderables.
         * @method inOriginFrom
         * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
         * a transitionable that manages origin (a two value array of numbers between zero and one).
         * @chainable
         */
        outOriginFrom(origin: Transitionable<fms.Origin>)  : RenderController;
    
        /**
         * Show displays the targeted renderable with a transition and an optional callback to
         * execute afterwards.
         */
        show(content: fms.IRenderable, transition: fms.ITransition     , callback?: ()=>void): void;
        show(content: fms.IRenderable, transition: fms.INamedTransition, callback?: ()=>void): void;
        show(content: fms.IRenderable, transition?: fms.IFuncTransition, callback?: ()=>void): void;
    
    
        /**
         * Hide hides the currently displayed renderable with an out transition.
         */
        hide (transition: fms.ITransition     , callback?: ()=>void): void;
        hide (transition: fms.INamedTransition, callback?: ()=>void): void;
        hide (transition?: fms.IFuncTransition, callback?: ()=>void): void;
     
        render() : fms.IRenderSpec;
    }

    export = RenderController;
}









declare module fms {
    interface IScrollerOptions{
        /** direction : Utility.Direction.Y  Using the direction helper found in the famous Utility
         * module, this option will lay out the Scroller instance's renderables either horizontally
         * (x) or vertically (y). Utility's direction is essentially either zero (X) or one (Y) */
        direction?: number;
         /** clipSize=undefined The size of the area (in pixels) that Scroller will display content in. */
        clipSize?: number;
         /** margin=undefined The size of the area (in pixels) that Scroller will process renderables' associated calculations in. */
        margin?: number;
    }
}

declare module "famous/views/Scroller" {

    import EventHandler = require('famous/core/EventHandler');
    import ViewSequence = require('famous/core/ViewSequence');

    //  EventHandler is mixed in
    /**
     * Scroller lays out a collection of renderables, and will browse through them based on
     * accessed position. Scroller also broadcasts an 'edgeHit' event, with a position property of the location of the edge,
     * when you've hit the 'edges' of it's renderable collection.
     */
    class Scroller<T extends fms.IRenderable>  extends EventHandler implements fms.IRenderable, fms.ISequenceView<T>{
        static DEFAULT_OPTIONS: fms.IScrollerOptions;
    
        
         options: fms.IScrollerOptions;
         _node: ViewSequence<T>;
         // used for shifting nodes
         _positionOffset: number;
    
         _onEdge: number; // -1 for top, 1 for bottom
    
         _eventInput: EventHandler;
         _eventOutput: EventHandler;
    
    
    
        constructor  (options?: fms.IScrollviewOptions);
            /**
         * Patches the Scroller instance's options with the passed-in ones.
         * @method setOptions
         * @param {Options} options An object of configurable options for the Scroller instance.
         */
        setOptions(options?: fms.IScrollviewOptions): void;
        /**
         * Tells you if the Scroller instance is on an edge.
         * @method onEdge
         * @return {Boolean} Whether the Scroller instance is on an edge or not.
         */
        onEdge(): boolean;
    
        /**
         * Allows you to overwrite the way Scroller lays out it's renderables. Scroller will
         * pass an offset into the function. By default the Scroller instance just translates each node
         * in it's direction by the passed-in offset.
         * Scroller will translate each renderable down
         * @method outputFrom
         * @param {Function} fn A function that takes an offset and returns a transform.
         * @param {Function} [masterFn]
         */
        outputFrom(fn: (offset: number)=>fms.Matrix4x4, masterFn: (offset: number)=>fms.Matrix4x4): void;
    
        /**
         * The Scroller instance's method for reading from an external position. Scroller uses
         * the external position to actually scroll through it's renderables.
         * @method positionFrom
         * @param {Getter} position Can be either a function that returns a position,
         * or an object with a get method that returns a position.
         */
        positionFrom(position: number): void;
        positionFrom(position: ()=>number): void;
        positionFrom(position: fms.IValueProvider<number>): void;
        
        // on(type:'edgeHit', handler: (event:{position: number})=> void): void;
    
    
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

    export = Scroller;
}









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










declare module fms {
    interface SequentialLayoutOptions{
        direction: number;
        itemSpacing?: number;
        defaultItemSize?:Size;
        
    }
    
    interface SequentialLayoutOutputResult{
        /** a transform matrix */
        transform: fms.Matrix4x4;
        /** the result of render method */
        target: fms.IRenderSpec;
    }
}

declare module "famous/views/SequentialLayout" {

    /**
     * SequentialLayout will lay out a collection of renderables sequentially in the specified direction.
     */
    class SequentialLayout<T extends fms.IRenderable> implements fms.IRenderable, fms.ISequenceView<T>{
        static DEFAULT_OPTIONS: fms.SequentialLayoutOptions;
        constructor  (options?: fms.SequentialLayoutOptions);
            
        /**
         * Patches the SequentialLayout instance's options with the passed-in ones.
         */
        setOptions (options: fms.SequentialLayoutOptions): SequentialLayout<T>;
        
        /** setOutputFunction is used to apply a user-defined output transform on each processed renderable.
         *  For a good example, check out SequentialLayout's own DEFAULT_OUTPUT_FUNCTION in the code.
         *
         * @param {Function} outputFunction An output processer for each renderable in the SequentialLayout
         * instance.
         */
        setOutputFunction (outputFunction: (input: T, position:number, index:number)=> fms.SequentialLayoutOutputResult): SequentialLayout<T>;
        
        /**
         * Sets the collection of renderables under the SequentialLayout instance's control.
         *
         * @method sequenceFrom
         * @param {Array|ViewSequence} sequence Either an array of renderables or a Famous viewSequence.
         */
        sequenceFrom (renderables: T[]): void;
        
        getSize(): fms.Size;
    
        render() : fms.IRenderSpec;
    }

    export = SequentialLayout;
}





declare module fms {
    interface NavigationBarOptions extends IViewOptions{
        size?: Size;
        backClasses?: string[];
        backContent?: string;
        classes: string[];
        content?: string;
        moreClasses?: string[];
        moreContent?: string;
    }
}

declare module "famous/widgets/NavigationBar" {
    
    import View = require('famous/core/View');
    
    class NavigationBar extends View<fms.NavigationBarOptions>{
        static DEFAULT_OPTIONS: fms.NavigationBarOptions;
        constructor  (options?: fms.NavigationBarOptions);
    
        /**
         * Set the title of the NavigationBar
         */
        setContent(content: string): void;
    }

    export = NavigationBar;
}





declare module fms {
    interface SliderOptions extends IViewOptions{
        size?: Size;
        indicatorSize?: Size;
        labelSize?: Size;
        range?: number[];
        precision?: number;
        value?: number;
        label?: string;
        fillColor?: string;
    }
}

declare module "famous/widgets/Slider" {
    
    import View = require('famous/core/View');
    import EventHandler = require('famous/core/EventHandler');

    class Slider extends EventHandler implements fms.IRenderable, fms.IValueProvider<number>{
        static DEFAULT_OPTIONS: fms.SliderOptions;
        constructor  (options?: fms.SliderOptions);
    
        get(): number;
        set(value:number): void;
        getSize(): fms.Size;
        render (): fms.IRenderSpec;
    }

    export = Slider;
}




declare module fms {
    interface ITabBarOptions{
        sections: any[];
        widget: ()=>fms.IRenderable;
        size: fms.Size;
        direction: number;
        buttons: fms.IToggleButtonOptions;
    }
}

declare module "famous/widgets/TabBar" {

    import View = require('famous/core/View');

    class TabBar extends View<fms.ITabBarOptions>{
        constructor  (options?: fms.IToggleButtonOptions);
    
    }

    export = TabBar;
}





declare module fms {
    interface IToggleButtonOptions{
        content?: string;
        offClasses?: string[];
        onClasses?: string[];
        size?: fms.Size;
        outTransition?: fms.INamedTransition;
        inTransition?: fms.INamedTransition;
        toggleMode?: number;
        crossfade?: boolean;
    }
}

declare module "famous/widgets/ToggleButton" {
    
    class ToggleButton extends fms.OutputHandler implements fms.IRenderable{
        constructor  (options?: fms.IToggleButtonOptions);
    
        static OFF: number;
        static ON: number;
        static TOGGLE: number;
    
        /**
         * Transition towards the 'on' state and dispatch an event to
         *  listeners to announce it was selected
         */
        select(): void;
    
        /**
         * Transition towards the 'off' state and dispatch an event to
         *  listeners to announce it was deselected
         */
        deselect(): void;
        /**
         * Return the state of the button
         * @return {boolean} selected state
         */
        isSelected(): boolean;
        /**
         * Override the current options
         */
        setOptions(options: fms.IToggleButtonOptions): void;
        /**
         * Return the size defined in the options object
         * @return {array} two element array [height, width]
         */
        getSize(): fms.Size;
        
        render (): fms.IRenderSpec;
    }

   export = ToggleButton;
}




declare module fms.physic {
    interface IBodyOptions extends fms.physic.IParticleOptions{
        /** The orientation of the Body */
        orientation?: fms.Vector4;
        /** The angular velocity of the Body */
        angularVelocity?: fms.Vector3;
        /** The angular momentum of the Body */
        angularMomentum?: fms.Vector3;
        /** The torque of the Body */
        torque?: fms.Vector3;
    }
}

declare module "famous/physics/bodies/Body" {

    import Vector = require('famous/math/Vector');
    import Particle = require('famous/physics/bodies/Particle');

    /**
     * A unit controlled by the physics engine which extends the zero-dimensional
     * Particle to include geometry. In addition to maintaining the state
     * of a Particle its state includes orientation, angular velocity
     * and angular momentum and responds to torque forces.
     */
    class Body extends Particle{
        static isBody: boolean;
        constructor (options: fms.physic.IBodyOptions);
        
        /**
         * Setter for moment of inertia, which is necessary to give proper
         * angular inertia depending on the geometry of the body.
         *
         * @method setMomentsOfInertia
         */
        setMomentsOfInertia(): void;
    
    
    
        /**
         * Extends Particle.reset to reset orientation, angular velocity
         * and angular momentum.
         */
        // reset(position? : fms.Vector3, velocity? : fms.Vector3, orientation?: fms.Vector4, angularMomentum?: fms.Vector3): void;
    
        /**
         * Setter for orientation
         */
        setOrientation(orientation?: fms.Vector4): void;
    
        /**
         * Setter for angular velocity
         */
        setAngularVelocity(velocity? : fms.Vector3): void;
    
        /**
         * Setter for angular momentum
         */
        setAngularMomentum(angularMomentum: fms.Vector3): void;
    
        /**
         * Extends Particle.applyForce with an optional argument
         * to apply the force at an off-centered location, resulting in a torque.
         *
         * @method applyForce
         * @param force {Vector} force
         * @param [location] {Vector} off-center location on the body
         */
        applyForce(force: Vector, location?: Vector): void;
    
        /**
         * Applied a torque force to a body, inducing a rotation.
         *
         * @method applyTorque
         * @param torque {Vector} torque
         */
        applyTorque(torque: Vector): void;
    }

   export = Body;
}



declare module fms.physic {
    interface ICircleOptions extends fms.physic.IBodyOptions{
        /** The radius of the circle */
        radius?: number;
    }
}
declare module "famous/physics/bodies/Circle" {

    import Body = require('famous/physics/bodies/Body');
 
    /**
     * Implements a circle, or spherical, geometry for an Body with
     * radius.
     */
    class Circle extends Body{
        constructor (options: fms.physic.ICircleOptions);
        
        /**
         * Basic setter for radius.
         * @method setRadius
         * @param r {Number} radius
         */
        setRadius(r: number): void;
    
    }
    export = Circle;
}





declare module fms.physic {
    interface IParticleOptions{
        /** The position of the particle */
        position? : fms.Vector3;
        /** The velocity of the particle */
        velocity? : fms.Vector3;
        /** The mass of the particle */
        mass? : number;
        /** The axis a particle can move along. Can be bitwise ORed e.g., Particle.AXES.X, Particle.AXES.X | Particle.AXES.Y */
        axis? : number;
    }

    interface IAxes{
        X: number; 
        Y: number; 
        Z: number; 
    }
    
}

declare module "famous/physics/bodies/Particle" {
    
    import Vector = require('famous/math/Vector');

    /**
     * A point body that is controlled by the Physics Engine. A particle has
     *   position and velocity states that are updated by the Physics Engine.
     *   Ultimately, a particle is a _special type of modifier, and can be added to
     *   the Famous render tree like any other modifier.
     */
    class Particle implements fms.IModifier, fms.IPositioned{
        static AXES: fms.physic.IAxes; 
        static isBody: boolean;
        public position:Vector;    
        constructor  (options?: fms.physic.IParticleOptions); 
        /**
         * Stops the particle from updating
         * @method sleep
         */
        public sleep() : void;
    
        /**
         * Starts the particle update
         * @method wake
         */
        wake() : void;
        
        /**
         * Basic setter for position
         * @param position {Array|Vector}
         */
        setPosition(position: fms.Vector3) : void;
        setPosition(position: Vector) : void;
    
        /**
         * 1-dimensional setter for position
         * @method setPosition1D
         * @param value {Number}
         */
        setPosition1D(x: number) : void;
    
        /**
         * Basic getter function for position
         * @method getPosition
         * @return position {Array}
         */
        getPosition(): fms.Vector3;
        /**
         * 1-dimensional getter for position
         * @method getPosition1D
         * @return value {Number}
         */
        getPosition1D(): number;
    
        /**
         * Defines the position from outside the Physics Engine
         * @method positionFrom
         * @param positionGetter {Function}
         */
        positionFrom(positionGetter: ()=> fms.Vector3) : void;
    
        /**
         * Basic setter function for velocity Vector
         * @method setVelocity
         * @function
         */
        setVelocity(velocity: number) : void;
        setVelocity(velocity: Vector) : void;
        setVelocity(velocity: fms.Vector3) : void;
    
        /**
         * 1-dimensional setter for velocity
         * @method setVelocity1D
         * @param velocity {Number}
         */
        setVelocity1D(x: number) : void;
    
        /**
         * Basic getter function for velocity Vector
         * @method getVelocity
         * @return velocity {Array}
         */
        getVelocity(): fms.Vector3;
    
        /**
         * 1-dimensional getter for velocity
         * @method getVelocity1D
         * @return velocity {Number}
         */
        getVelocity1D(): number;
    
        /**
         * Basic setter function for mass quantity
         * @method setMass
         * @param mass {Number} mass
         */
        setMass(mass: number) : void;
    
        /**
         * Basic getter function for mass quantity
         * @method getMass
         * @return mass {Number}
         */
        getMass(): number;
    
        /**
         * Reset position and velocity
         * @method reset
         * @param position {Array|Vector}
         * @param velocity {Array|Vector}
         */
        reset(position? : fms.Vector3, velocity? : fms.Vector3, orientation?: fms.Vector4, angularMomentum?: fms.Vector3): void;
        reset(position? : Vector, velocity? : Vector): void;
    
        /**
         * Add force vector to existing internal force Vector
         * @method applyForce
         * @param force {Vector}
         */
        applyForce(force: Vector) : void;
    
        /**
         * Add impulse (change in velocity) Vector to this Vector's velocity.
         * @method applyImpulse
         * @param impulse {Vector}
         */
        applyImpulse(impulse: Vector) : void;
    
        /**
         * Get kinetic energy of the particle.
         * @method getEnergy
         * @function
         */
        getEnergy(): number;
    
        /**
         * Generate transform from the current position state
         * @method getTransform
         * @return Transform {Transform}
         */
        getTransform(): fms.Matrix4x4;
        /**
         * The modify interface of a Modifier
         * @method modify
         * @param target {Spec}
         * @return Spec {Spec}
         */
        modify (renderSpec: fms.IRenderSpec): fms.IRenderSpec;
    }
    
    export = Particle;
}



declare module fms.physic {
    interface IRectangleOptions extends fms.physic.IBodyOptions{
        /** The radius of the circle */
        size?: fms.Size;
    }
}

declare module "famous/physics/bodies/Rectangle" {

    import Body = require('famous/physics/bodies/Body');

    /**
     * Implements a circle, or spherical, geometry for an Body with
     * radius.
     */
    class Rectangle extends Body{
        constructor (options: fms.physic.IRectangleOptions);
        
        /**
         * Basic setter for size.
         */
        setSize(size: fms.Size): void;
    
    }

    export = Rectangle;
}





declare module fms.physic {

    interface ICollisionOptions{
        /**  The energy ratio lost in a collision (0 = stick, 1 = elastic) Range : [0, 1], default is 0.5 */
        restitution: number;
        /**   Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1], default is 0.5  */
        drift: number;
        /**  Amount of penetration in pixels to ignore before collision event triggers, default 0*/
        slop : number;

    }
}


declare module "famous/physics/constraints/Collision" {

    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  Allows for two circular bodies to collide and bounce off each other.
     *  @param {Options} [options] An object of configurable options.
     *
     */
    class Collision extends Constraint{
        constructor(options?: fms.physic.ICollisionOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ICollisionOptions): void;
    
    }
   export = Collision;
}





declare module "famous/physics/constraints/Constraint" {
    
    import Particle = require('famous/physics/bodies/Particle');

    /**
     * Constraint base class.
     */
    class Constraint {
        /**
         * Constraint base class.
         *
         */
        constructor();
    
    
        /**
         * applyConstraint
         * @param targets  Array of Particle to apply the constraint to
         * @param source The source of the constraint
         * @param dt Delta time
        */
        applyConstraint(targets: Particle, source?: Particle, dt?: number ): void;
        applyConstraint(particle: Particle[], source?: Particle, dt?: number): void;
        /**
         * Getter for energy
         */
        getEnergy(): number;
    
        /**
         * Setter for energy
         */
        setEnergy(energy: number): void;
    }

    export = Constraint;
}





declare module fms.physic {
    interface ICurveOptions{
        /**   An implicitly defined surface f(x,y,z) = 0 that body is constrained to e.g. function(x,y,z) { x*x + y*y - r*r } corresponds to a circle of radius r pixels, default is no surface */
        equation?: (x: number, y: number, z: number)=>number;
        /**   An implicitly defined second surface that the body is constrained to, default is the xy-surface with z = 0 */
        plane?:  (x: number, y: number, z: number)=>number;
        /**  The spring-like reaction when the constraint is violated */
        period? : number;
        /** The damping-like reaction when the constraint is violated */
        dampingRatio? : number;
    }
}




declare module "famous/physics/constraints/Curve" {

    import Constraint = require('famous/physics/constraints/Constraint');
    
    /**
     *  A constraint that keeps a physics body on a given implicit curve
     *    regardless of other physical forces are applied to it.
     *
     *    A curve constraint is two surface constraints in disguise, as a curve is
     *    the intersection of two surfaces, and is essentially constrained to both
     *
     */
    class Curve extends Constraint{
        constructor(options?: fms.physic.ICurveOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ICurveOptions): void;
    
    }
    export = Curve;
}





declare module fms.physic {
    interface IDistanceOptions{
        /** the location of the anchor */
        anchor: any;  // fms.Vector3 | Vector | fms.IPositioned
        /** The amount of Distance from the anchor the constraint should enforce*/
        length : number;
        /** the minimum Distance before the constraint is activated. Use this property for a "rope" effect. */
        minLength : number;
        /** the spring-like reaction when the constraint is broken. */
        period : number;
        /** the damping-like reaction when the constraint is broken. */
        dampingRatio: number;
    }
}




declare module "famous/physics/constraints/Distance" {
    
    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  A constraint that keeps a physics body a given distance away from a given
     *  anchor, or another attached body.
     */
    class Distance extends Constraint{
        constructor(options?: fms.physic.IDistanceOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IDistanceOptions): void;
    
    }
    export = Distance;
}





declare module fms.physic {
    interface ISnapOptions{
        
        
        /** [options.period] The amount of time in milliseconds taken for one complete oscillation when there is no damping. Range : [150, Infinity] */
        period: number;
        /** [options.dampingRatio] Additional damping of the spring. Range : [0, 1]. At 0 this spring will still be damped, at 1 the spring will be critically damped (the spring will never oscillate) */
        dampingRatio: number;
        /** [options.length] The rest length of the spring. Range: [0, Infinity]. */
        length : number;
        /** [options.anchor] The location of the spring's anchor, if not another physics body. */
        anchor : any;  // fms.Vector3 | Vector | fms.IPositioned
    }
}

declare module "famous/physics/constraints/Snap" {

    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  A spring constraint is like a spring force, except that it is always
     *    numerically stable (even for low periods), at the expense of introducing
     *    damping (even with dampingRatio set to 0).
     *
     *    Use this if you need fast spring-like behavior, e.g., snapping
     */
    class Snap extends Constraint{
        constructor(options?: fms.physic.ISnapOptions);
        /**
         * Set the anchor position
         */
        setAnchor(v: fms.Vector3): void;
        setAnchor(v: fms.math.Vector):  void;
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ISnapOptions): void;
    
    }

    export = Snap;
}





declare module fms.physic {
    interface ISurfaceOptions{
        /**   An implicitly defined surface f(x,y,z) = 0 that body is constrained to e.g. function(x,y,z) { x*x + y*y - r*r } corresponds corresponds to a sphere of radius r pixels, default is no surface */
        equation: (x: number, y: number, z: number)=>number;
        /**  The spring-like reaction when the constraint is violated */
        period? : number;
        /** The damping-like reaction when the constraint is violated */
        dampingRatio? : number;
    }
}


declare module "famous/physics/constraints/Surface" {

    import Constraint = require('famous/physics/constraints/Constraint');
    
    /**
     *  A constraint that keeps a physics body on a given implicit surface
     *    regardless of other physical forces are applied to it.
     */
    class Surface extends Constraint{
        constructor(options: fms.physic.ISurfaceOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ISurfaceOptions): void;
    }

   export = Surface;
}





declare module fms.physic {
    interface IWallOnContact{
        /** Physical bodies bounce off the wall */
        REFLECT : number;
        /** Physical bodies are unaffected. Usecase is to fire events on contact. */
        SILENT : number;
    }
    
    interface IWallOptions{
        /**  The energy ratio lost in a collision (0 = stick, 1 = elastic). Range : [0, 1] default = 0.5 */
        restitution? : number;
        /**  Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1]  default = 0.5 */
        drift? : number;
        /**  Amount of penetration in pixels to ignore before collision event triggers.  default = 0*/
        slop? : number;
        /**  The normal direction to the wall. default = [1, 0, 0] */
        normal? : fms.Vector3;
        /**  The distance from the origin that the wall is placed. default = 0*/
        distance? : number;
        /**  How to handle collision against the wall. A value of Wall.ON_CONTACT, default Wall.ON_CONTACT.REFLECT*/
        onContact? : number; 
    }
}
declare module "famous/physics/constraints/Wall" {
    
    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  A wall describes an infinite two-dimensional plane that physics bodies
     *    can collide with. To define a wall, you must give it a distance (from
     *    the center of the physics engine's origin, and a normal defining the plane
     *    of the wall.
     *
     *    (wall)
     *      |
     *      | (normal)     (origin)
     *      | --->            *
     *      |
     *      |    (distance)
     *      ...................
     *            (100px)
     *
     *      e.g., Wall({normal : [1,0,0], distance : 100})
     *      would be a wall 100 pixels to the left, whose normal points right
     */
    class Wall extends Constraint {
        public static ON_CONTACT : fms.physic.IWallOnContact;
    
        constructor(options: fms.physic.IWallOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IWallOptions): void;
    }

    export = Wall;
}






declare module fms.physic {
    interface IWallsOptions{
         /**  An array of sides e.g., [Walls.SIDES.LEFT, Walls.SIDES.TOP] default: Walls.SIDES.TWO_DIMENSIONAL */
        sides : number[]; 
         /**  The size of the bounding box of the walls. default: [window.innerWidth, window.innerHeight, 0] */
        size : fms.Size3;
         /**  The center of the wall relative to the size. default: [.5, .5, .5] */
        origin : fms.Origin3;
         /**  Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1] default: 0.5 */
        drift : number;
         /**  Amount of penetration in pixels to ignore before collision event triggers. default: 0 */
        slop : number;
         /**  The energy ratio lost in a collision (0 = stick, 1 = elastic) The energy ratio lost in a collision (0 = stick, 1 = elastic) default: 0.5*/
        restitution : number;
         /**  How to handle collision against the wall. default: Walls.ON_CONTACT.REFLECT */
        onContact : number;
    }
}

declare module "famous/physics/constraints/Walls" {
    
    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  Walls combines one or more Wall primitives and exposes a simple API to
     *  interact with several walls at once. A common use case would be to set up
     *  a bounding box for a physics body, that would collide with each side.
     */
    class Walls extends Constraint {
        public static ON_CONTACT : fms.physic.IWallOnContact;
        public static SIDES : {
                LEFT   : number;
                RIGHT  : number;
                TOP    : number;
                BOTTOM : number;
                FRONT  : number;
                BACK   : number;
                TWO_DIMENSIONAL : number[];
                THREE_DIMENSIONAL : number[];
            }
    
        constructor(options: fms.physic.IWallsOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IWallsOptions): void;
        /*
         * Setter for size and origin
         */
         setSize(size: fms.Size3, origin: fms.Origin3): void;   
    
        /**
         * Apply a method to each wall making up the walls
         *
         * @method applyConstraint
         * @param fn {Function}  Function that takes in a wall as its first parameter
         */
        forEach(fn : (side: number, index?: number)=>void ): void;
    
        /**
         * Rotates the walls by an angle in the XY-plane
         */
        rotateZ(angle: number) : void ;
    
        /**
         * Rotates the walls by an angle in the YZ-plane
         */
        rotateX(angle: number) : void ;
    
        /**
         * Rotates the walls by an angle in the XZ-plane
         */
        rotateY(angle: number) : void ;
    }

    export = Walls;
}






declare module fms.physic {
    interface IDragFunctions{
        /**
         * A drag force proportional to the velocity
         */
        LINEAR: (v: fms.math.Vector)=>fms.math.Vector;

        /**
         * A drag force proportional to the square of the velocity
         */
        QUADRATIC: (v: fms.math.Vector)=>fms.math.Vector;
    }
    
    interface IDragOptions{
        /**
         * The strength of the force
         *    Range : [0, 0.1]
         * @default 0.01
         */
        strength? : number;

        /**
         * The type of opposing force
         * @attribute forceFunction
         * @type Function
         */
        forceFunction? : (v: fms.math.Vector)=>fms.math.Vector;

    }
}

declare module "famous/physics/forces/Drag" {

    import Force = require('famous/physics/forces/Force');
    
    /**
     * Drag is a force that opposes velocity. Attach it to the physics engine
     * to slow down a physics body in motion.
     */
    class Drag extends Force {
        public static FORCE_FUNCTIONS: fms.physic.IDragFunctions; 
        /**
         * Drag class.
         * @class Drag
         */
        constructor(options?: fms.physic.IDragOptions);
    
        /**
         * Basic options setter
         */
        setOptions (options: fms.physic.IDragOptions): void;
    }

    export = Drag;
}






declare module "famous/physics/forces/Force" {

    import Particle = require('famous/physics/bodies/Particle');

    /**
     * Force base class.
     */
    class Force {
        /**
         * Force base class.
         *
         * @class Force
         * @uses EventHandler
         * @constructor
         */
        constructor(force: fms.Vector3);
    
    
        /**
         * Adds a force to a physics body's force accumulator.
         *
         * @method applyForce
         * @param particle  to apply force to
         * @param source the source of the force
         */
        applyForce(particle: Particle, source?: Particle ): void;
        applyForce(particle: Particle[], source?: Particle): void;
    
        /**
         * Getter for a force's potential energy.
         *
         * @method getEnergy
         * @return energy {Number}
         */
        getEnergy(): number;
    
        /*
         * Setter for a force's potential energy.
         *
         * @method setEnergy
         * @param energy {Number}
         */
        setEnergy(energy: number): void;
    }

    export = Force;
}





declare module fms.physic {
  /**
   * A linear decay function
   */
   interface IRepulsionFunction{
       /**
        * @param radius distance from the source body
        * @param cutoff the effective radius of influence to avoid singularities
        */
       (radius: number, cutoff : number): number;           
   }
   interface IRepulsionFunctions{
        /**
         * A linear decay function
         * max(1 - (1 / cutoff) * radius, 0)
         */
        LINEAR : IRepulsionFunction;
        /**
         * A Morse potential decay function (http://en.wikipedia.org/wiki/Morse_potential)
         */
        MORSE : IRepulsionFunction;
        /**
         * An inverse distance decay function
         * 1 / (1 - cutoff + r)
         */
        INVERSE : IRepulsionFunction;

        /**
         * An inverse squared distance decay function
         *   1 / (1 - cutoff + r*r);
         */
        GRAVITY : IRepulsionFunction;
    }

    interface IRepulsionOptions{
        /**
         * The strength of the force
         *   Range : [0, 100]
         * @default 1
         */
        strength? : number;

        /**
         * The location of the force, if not another physics body
         */ 
        anchor? : any; // Vector | fms.Vector3 | fms.IPositioned

        /**
         * The range of the repulsive force
         * @default [0, Infinity]
         */
        range? : fms.Range;

        /**
         * A normalization for the force to avoid singularities at the origin
         * @default 0
         */
        cutoff? : number;

        /**
         * The maximum magnitude of the force
         *    Range : [0, Infinity]
         * @default Infinity
         */
        cap? : number;

        /**
         * The type of decay the repulsive force should have
         * @default Repulsion.DECAY_FUNCTIONS.GRAVITY
         */
        decayFunction? : IRepulsionFunction;
    }
}


declare module "famous/physics/forces/Repulsion" {

    import Force = require('famous/physics/forces/Force');

    /**
     *  Repulsion is a force that repels (attracts) bodies away (towards)
     *    each other. A repulsion of negative strength is attractive.
     *
     */
    class Repulsion extends Force{
        public static DECAY_FUNCTIONS: fms.physic.IRepulsionFunctions;
        /**
         * Force base class.
         *  @param {Object} options overwrites default options
         */
        constructor(options: fms.physic.IRepulsionOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IRepulsionOptions): void;
    
    }

    export = Repulsion;
}




declare module "famous/physics/forces/RotationalDrag" {
    
    import Drag = require('famous/physics/forces/Drag');

    /**
     * Rotational drag is a force that opposes angular velocity.
     * Attach it to a physics body to slow down its rotation.
     */
    class RotationalDrag extends Drag {
        public static FORCE_FUNCTIONS: fms.physic.IDragFunctions; 
        constructor(options: fms.physic.IDragOptions);
    
    }

    export = RotationalDrag;
}




 declare module "famous/physics/forces/RotationalSpring" {
     
    import Spring = require('famous/physics/forces/Spring');

   /**
     *  A force that rotates a physics body back to target Euler angles.
     *  Just as a spring translates a body to a particular X, Y, Z, location,
     *  a rotational spring rotates a body to a particular X, Y, Z Euler angle.
     *      Note: there is no physical agent that does this in the "real world"
     */
    class RotationalSpring extends Spring {
        constructor(options: fms.physic.ISpringOptions);
    }
    
    export = RotationalSpring;
}






declare module fms.physic {
    interface ISpringFunctions{
        /**
         * A FENE (Finitely Extensible Nonlinear Elastic) spring force
         *      see: http://en.wikipedia.org/wiki/FENE
         */
        FENE : (dist: number, rMax?: number) => number;

        /**
         * A Hookean spring force, linear in the displacement
         *      see: http://en.wikipedia.org/wiki/FENE
         */
        HOOK : (dist: number, rMax?: number) => number;
    }
    
    interface ISpringOptions{
        /**
         * The amount of time in milliseconds taken for one complete oscillation
         * when there is no damping
         *    Range : [150, Infinity]
         * @attribute period
         * @type Number
         * @default 300
         */
        period?: number;

        /**
         * The damping of the spring.
         *    Range : [0, 1]
         *    0 = no damping, and the spring will oscillate forever
         *    1 = critically damped (the spring will never oscillate)
         * @attribute dampingRatio
         * @type Number
         * @default 0.1
         */
        dampingRatio? : number;

        /**
         * The rest length of the spring
         *    Range : [0, Infinity]
         * @attribute length
         * @type Number
         * @default 0
         */
        length? : number;

        /**
         * The maximum length of the spring (for a FENE spring)
         *    Range : [0, Infinity]
         * @attribute length
         * @type Number
         * @default Infinity
         */
        maxLength? : number;

        /**
         * The location of the spring's anchor, if not another physics body
         *
         * @attribute anchor
         * @type Array
         * @optional
         */
        anchor? : fms.Vector3;

        /**
         * The type of spring force
         * @attribute forceFunction
         * @type Function
         */
        forceFunction? : (dist: number, rMax?: number) => number;

    }
}

declare module "famous/physics/forces/Spring" {

    import Force = require('famous/physics/forces/Force');

    /**
     *  A force that moves a physics body to a location with a spring motion.
     *    The body can be moved to another physics body, or an anchor point.
     *
     */
    class Spring extends Force {
        public static FORCE_FUNCTIONS: fms.physic.ISpringFunctions; 
        /**
         * Force base class.
         *
         * @class Force
         * @uses EventHandler
         * @constructor
         */
        constructor(options: fms.physic.ISpringOptions);
    
        /**
         * Basic options setter
         */
        setOptions (options: fms.physic.ISpringOptions): void;
    }

   export = Spring;
}






declare module fms.physic {
  /**
   * A vector field function
   */
   interface IVectorFieldFunction{
       /**
        * @param v {Vector}        Current position of physics body
        * @param option of the field
        * @return unscaled force
        */
       (v: fms.math.Vector, options : IVectorFieldOptions): number;           
   }
   interface IVectorFieldFunctions{
        /**
         * Constant force, e.g., gravity (options.direction is needed)
         */
        CONSTANT : IVectorFieldFunction;
        /**
         * Linear force
         */
        LINEAR : IVectorFieldFunction;
        /**
         * Radial force, e.g., Hookean spring
         */
        RADIAL : IVectorFieldFunction;

        /**
         * Spherical force (option.radius is needed) 
         */
        SPHERE_ATTRACTOR : IVectorFieldFunction;

        /**
         * Point attractor force, e.g., Hookean spring with an anchor (option.position is needed)
         */
        POINT_ATTRACTOR : IVectorFieldFunction;
    }

    interface IVectorFieldOptions{
        /**
         * The strength of the force
         *    Range : [0, 10]
         * @default 1
         */
        strength? : number;

        /**
         * Type of the vectorfield
         * @default VectorField.FIELDS.CONSTANT
         */
        field? : IVectorFieldFunction;
        
        /**
         * direction of a CONSTANT vectorfield 
         * @default  Vector(0,1,0)
         */
        direction?: fms.math.Vector; 
        /**
         * position of a POINT_ATTRACTOR vectorfield 
         * @default  Vector(0,0,0)
         */
        position?: fms.math.Vector; 
        /**
         * radius of a FIELDS.SPHERE_ATTRACTOR vectorfield 
         * @default  1
         */
        radius?: number;
    } 
}


declare module "famous/physics/forces/VectorField" {

    import Force = require('famous/physics/forces/Force');

    /**
     *  A force that moves a physics body to a location with a spring motion.
     *    The body can be moved to another physics body, or an anchor point.
     */
    class VectorField extends Force{
        public static FIELDS: fms.physic.IVectorFieldFunctions;
        /**
         * Force base class.
         *  @param {Object} options overwrites default options
         */
        constructor(options: fms.physic.IVectorFieldOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IVectorFieldOptions): void;
    
    }

   export = VectorField;
}

