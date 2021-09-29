import express, {Router, Request, Response} from 'express';
import {controllerRegistery, middlewaresRegistery}  from './ControllerRegistery';
import {Controller, Methods, Middleware} from './controller';
import { ActionConfig, ControllerConfig, MiddlewareExecutionOrder, Middlewares } from './types';
const app = express()
const port = 3000;
const flatMiddlewareList = (order: MiddlewareExecutionOrder, middlewares: Middlewares[]): Function[] => {
    let middlewareListToExecute = new Array<Function>();
    if (order === 'PRE') {
        middlewares.forEach((mw: Middlewares) => {
            if (typeof mw === 'function' && mw.prototype.useBefore) {
                middlewareListToExecute.push(mw.prototype.useBefore);
            } else if (typeof mw === 'function' && !mw.prototype.useAfter) {
                middlewareListToExecute.push(mw);
            } else if (typeof mw === 'string' && middlewaresRegistery.has(mw)) {
                middlewareListToExecute.push(middlewaresRegistery.get(mw).useBefore);
            } else {
                throw new Error('Middleware Not Found' + mw);
            }
        })
    } else {
        //TODO For POST Execution
    }

    return middlewareListToExecute;
}
export const startHTTPServer = () => {
    setTimeout(function() {
        controllerRegistery.forEach((controllerConfig) => {
            let router = new Router();
            const preMiddlwares = flatMiddlewareList('PRE', controllerConfig.controllerMiddlewares || []);
            preMiddlwares.forEach((mw) => {
                router.use(mw)
            })
            controllerConfig.actions.forEach((actionConfig) => {
                router[actionConfig.method.toLowerCase()](actionConfig.path || '', actionConfig.actionHandler); 
            });
            app.use(controllerConfig.path || '', router);
        })

        app.listen(port, () => {
            console.log(`appbase server listening at http://localhost:${port}`)
          })
    });

}



export default {
    Controller: Controller,
    Methods: Methods,
    Middleware: Middleware,
};
