/// <reference path='../core/Surface.d.ts' />
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

