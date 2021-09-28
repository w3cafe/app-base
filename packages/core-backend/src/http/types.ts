
export type PathType = string | RegExp | (string | RegExp)[];

export type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
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

export type CommonConfig = {
  path?: PathType,
  middlewares?: ControllerMiddlewares[],
  controllerName?: string
}

export type ActionConfig = CommonConfig & {
  actionHandler: Function,
  actionMiddlewares: ControllerMiddlewares[]
  method: HttpMethods
}

export type ControllerConfig = CommonConfig & {
  actions: ActionConfig[],
  controllerConstructor: Function,
  controllerMiddlewares: ControllerMiddlewares[]
}

 