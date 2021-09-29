import { registerEntity } from '@appbase/core-backend';
import { ModuleRegistery } from '@appbase/core-models';

import User from './entity/User';
export * from './middlewares/Auth';
export * from  './HTTPControllers/UserController';



export default class UserModule implements ModuleRegistery{
    static register() {
        registerEntity(User);
    }
}

