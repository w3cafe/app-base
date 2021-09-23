import {actionsList, controllerRegistery}  from './ControllerRegistery';

import {Controller, Methods} from './controller';

export const startHTTPServer = () => {
    setTimeout(function() {
        console.info('startHTTPServer Called....', actionsList);
        actionsList.forEach((action) => {
            console.info('action vivek vivek soni...', action);
            //const controllerOptions
        })
    });

}



export default {
    Controller: Controller,
    Methods: Methods,
};
