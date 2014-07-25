/// <reference path='../core/Common.d.ts' />

declare module "famous/math/Utilities" {

    class Utilities {
        /**
         * Constrain input to range.
         */
        static clamp(value: number, range: fms.Range): number;
    
        /**
         * Euclidean length of numerical array.
         */
        static length(array: number[]): number;
    }

    export = Utilities;
}

