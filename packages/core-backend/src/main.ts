import { _bootstrap as DBBootStrap} from "./db";
import {registerModule} from "./module";


DBBootStrap();

const startServerApp = function () {
    global._moduleList.forEach((moduleClass) => {
        moduleClass.register();
    }); 
}

export * from './db';
export {
    registerModule, 
    startServerApp
};

