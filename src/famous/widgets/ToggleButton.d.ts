/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/OutputHandler.d.ts' />

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
