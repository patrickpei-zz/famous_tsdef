declare module fms {
    interface IEasing{
        inQuad (t: number): number;
        outQuad (t: number): number;
        inOutQuad (t: number): number;
        inCubic (t: number): number;
        outCubic (t: number): number;
        inOutCubic (t: number): number;
        inQuart (t: number): number;
        outQuart (t: number): number;
        inOutQuart (t: number): number;
        inQuint (t: number): number;
        outQuint (t: number): number;
        inOutQuint (t: number): number;
        inSine (t: number): number;
        outSine (t: number): number;
        inOutSine (t: number): number;
        inExpo (t: number): number;
        outExpo (t: number): number;
        inOutExpo (t: number): number;
        inCirc (t: number): number;
        outCirc (t: number): number;
        inOutCirc (t: number): number;
        inElastic (t: number): number;
        outElastic (t: number): number;
        inOutElastic (t: number): number;
        inBack (t: number, s?: number): number;
        outBack (t: number, s?: number): number;
        inOutBack (t: number, s?: number): number;
        inBounce (t: number): number
        outBounce (t: number): number
        inOutBounce (t: number): number
    }
}



declare module "famous/transitions/Easing" {
    var Easing : fms.IEasing;
    export = Easing;
}
