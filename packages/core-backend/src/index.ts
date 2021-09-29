import "reflect-metadata";
import { _bootstrap as DBBootStrap} from "./db";
import {registerModule} from "./module";
import HTTP, {startHTTPServer} from './http';

DBBootStrap();

const startServerApp = function () {
    global._moduleList.forEach((moduleClass) => {
        moduleClass.register();
    }); 

    startHTTPServer();
}

export * from './db';
export * from './http';
export {
    registerModule, 
    startServerApp,
    HTTP
};

