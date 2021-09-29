import { registerModule, startServerApp, HTTP } from '@appbase/core-backend';
import UserModule from '@appbase/module-user';

registerModule(UserModule);
startServerApp();

console.info('HTTP', HTTP);
@HTTP.Controller('/user')
class UserController {
    constructor() {
        console.info('UserController called');
    }
    @HTTP.Methods.GET('')
    get(req, res) {
        res.send('Hello World');
    }
}