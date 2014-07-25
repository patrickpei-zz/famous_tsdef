/// <reference path='../core/Surface.d.ts' />
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

