import {Router} from 'express';

import {actionsList, controllerRegistery}  from './ControllerRegistery';
import {Controller, Methods} from './controller';
import { ActionConfig, ControllerConfig } from './types';
 
const mergeConfigs = (controllerConfig: ControllerConfig, actionConfig: ActionConfig): ActionConfig => {
    return {
        controllerName: controllerConfig.controllerName, 
        actionHandler: actionConfig.actionHandler,
        method: actionConfig.method,
        actionMiddlewares: actionConfig.actionMiddlewares,
        path: String(controllerConfig.path || '') + String(actionConfig.path || '')
    }
}
export const startHTTPServer = () => {
    setTimeout(function() {
        console.info('startHTTPServer Called....', actionsList);
        controllerRegistery.forEach((controllerConfig) => {
            let router = new Router();
            controllerConfig.actions.forEach((actionConfig) => {
                const mergedActionConfig = mergeConfigs(controllerConfig, actionConfig);
                console.info('mergedActionConfig', mergedActionConfig);
                router[mergedActionConfig.method.toLowerCase()] = function() {

                }
            });
        })
    });

}



export default {
    Controller: Controller,
    Methods: Methods,
};
