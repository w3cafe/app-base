import {ControllerOptions, PathType}  from './types';
import { actionsList, controllerRegistery } from './ControllerRegistery';

function mapOptions(options: any): ControllerOptions {
    if (typeof options === "string" || options instanceof RegExp || Array.isArray(options)) {
      return {
        path: options
      };
    }
  
    return options;
}




  export function Controller(options: PathType | ControllerOptions): ClassDecorator {
    const {...opts} = mapOptions(options);
      return (target) => {
        controllerRegistery.set(target, opts);
    };
  }


export class Methods {
    static GET(options) {
        return function(targetClass: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<() => void>) {
            actionsList.add({
                actionHandler: descriptor.value,
                controller: targetClass,
                options: options
            })
        }
    }
}