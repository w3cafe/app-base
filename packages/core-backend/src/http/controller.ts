import { PathType, ControllerConfig, ActionConfig}  from './types';
import { actionsList, controllerRegistery } from './ControllerRegistery';

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
    console.info('controllerOptions', controllerOptions);
      return  function(constructor: Function) {
        const actions = new Array<ActionConfig>();
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
    static GET(options: PathType | any) {
      const {...actionConfig} = mapOptions(options);
        return function( target: any,
          propertyKey: string | symbol,
          descriptor: PropertyDescriptor) {
            const actions: [ActionConfig] =  target["actions"] || [];
            actions.push({
              method: 'GET',
              actionMiddlewares: actionConfig.middlewares,
              actionHandler: descriptor.value,
            })
            target['actions'] = actions;
            return descriptor;
        }
    }
}
