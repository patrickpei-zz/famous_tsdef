/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/View.d.ts' />

declare module fms {
    interface NavigationBarOptions extends IViewOptions{
        size?: Size;
        backClasses?: string[];
        backContent?: string;
        classes: string[];
        content?: string;
        moreClasses?: string[];
        moreContent?: string;
    }
}

declare module "famous/widgets/NavigationBar" {
    
    import View = require('famous/core/View');
    
    class NavigationBar extends View<fms.NavigationBarOptions>{
        static DEFAULT_OPTIONS: fms.NavigationBarOptions;
        constructor  (options?: fms.NavigationBarOptions);
    
        /**
         * Set the title of the NavigationBar
         */
        setContent(content: string): void;
    }

    export = NavigationBar;
}
