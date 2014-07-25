
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
