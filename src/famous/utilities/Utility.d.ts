interface IDirection {
    X:number;
    Y:number; 
    Z:number; 
}

interface IUtility {
    Direction:IDirection;
}

declare var Utility:IUtility;
declare module "famous/utilities/Utility" {
   export = Utility;
}

