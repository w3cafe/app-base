
export type PathType = string | RegExp | (string | RegExp)[];

export type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
export type Middlewares = String | Function 
export type MiddlewareExecutionOrder = 'PRE' | 'POST';
export interface MiddlewareDefination {
    useBefore: Function;
    //use: any[];
    useAfter: Function;
  }

export interface ControllerOptions {
    path?: PathType;
    routerOptions?: any;
    middlewares?: Middlewares[];
  }



export type HTTPLib  = {
    Controller: Function
}

export type CommonConfig = {
  path?: PathType,
  middlewares?: Middlewares[],
  controllerName?: string
}

export type ActionConfig = CommonConfig & {
  actionHandler: Function,
  actionMiddlewares: Middlewares[]
  method: HttpMethods
}

export type ControllerConfig = CommonConfig & {
  actions: ActionConfig[],
  controllerConstructor: Function,
  controllerMiddlewares: Middlewares[]
}

 