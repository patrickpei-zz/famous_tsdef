/// <reference path='EventHandler.d.ts' />
/// <reference path='Common.d.ts' />

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

