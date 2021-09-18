import User from './entity/User';

import { registerEntity } from '@appbase/core-backend';
import { ModuleRegistery } from '@appbase/core-models';


export default class UserModule implements ModuleRegistery{
    static register() {
        registerEntity(User);
    }
}