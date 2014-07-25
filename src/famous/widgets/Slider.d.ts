/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/View.d.ts' />

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
