import { PathType, Middlewares, ActionConfig, MiddlewareDefination, HttpMethods}  from './types';
import { middlewaresRegistery, controllerRegistery } from './ControllerRegistery';

function mapOptions(options: any): any  {
  let opts: any = {};
    if (typeof options === "string" || options instanceof RegExp || Array.isArray(options)) {
      opts =  {
        path: options,
      };
    } else {
      opts = options;
    }
  
    return opts;
}




  export function Controller(options: PathType | any): ClassDecorator {
    const {...controllerOptions} = mapOptions(options);
      return  function(constructor: Function) {
        controllerRegistery.add({
          path: controllerOptions.path,
          controllerMiddlewares: controllerOptions.middlewares,
          controllerName: constructor.name,
          controllerConstructor: constructor,
          actions: constructor.prototype["actions"]  as ActionConfig[]
        })
      }
  }


export class Methods {
    private static execute(method: HttpMethods, options: PathType | any) {
      const {...actionConfig} = mapOptions(options);
      return function( target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor) {
          const actions: [ActionConfig] =  target["actions"] || [];
          actions.push({
            method,
            actionMiddlewares: actionConfig.middlewares,
            actionHandler: descriptor.value,
          })
          target['actions'] = actions;
          return descriptor;
      }
    }
    static GET(options: PathType | any) {
      return Methods.execute('GET', options);
    }
    static POST(options: PathType | any) {
      return Methods.execute('POST', options);
    }
    static DELETE(options: PathType | any) {
      return Methods.execute('DELETE', options);
    }
    static PATCH(options: PathType | any) {
      return Methods.execute('PATCH', options);
    }
}

export function Middleware(middlewareName: string) {
  return function(target: any) {
    console.info('options', middlewareName);
    console.info('target is called', target.prototype);
    middlewaresRegistery.set(middlewareName, target as MiddlewareDefination)
  }
}
