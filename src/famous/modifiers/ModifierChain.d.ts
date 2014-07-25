/// <reference path='../core/Common.d.ts' />

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

