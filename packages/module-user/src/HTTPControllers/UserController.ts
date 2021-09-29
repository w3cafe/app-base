import { HTTP } from '@appbase/core-backend';

@HTTP.Controller('/user')
export class UserController {
    constructor() {
        console.info('UserController called');
    }
    @HTTP.Methods.GET('')
    get(req, res) {
        res.send('Hello World From Real User Controller');
    }
}