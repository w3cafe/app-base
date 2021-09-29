import { HTTP } from '@appbase/core-backend';

@HTTP.Middleware('Auth')
export class AuthMiddleware {
    useBefore() {

    }
}

