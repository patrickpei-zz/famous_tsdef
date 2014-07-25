
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
