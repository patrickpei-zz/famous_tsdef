

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
