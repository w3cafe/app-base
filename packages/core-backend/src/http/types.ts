
export type PathType = string | RegExp | (string | RegExp)[];


export interface ControllerMiddlewares {
    useBefore: any[];
    use: any[];
    useAfter: any[];
  }

export interface ControllerOptions {
    path?: PathType;
    routerOptions?: any;
    middlewares?: Partial<ControllerMiddlewares>;
  }



export type HTTPLib  = {
    Controller: Function
}