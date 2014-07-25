/// <reference path='../core/View.d.ts' />
/// <reference path='./ToggleButton.d.ts' />

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

