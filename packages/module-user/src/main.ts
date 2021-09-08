import User from './entity/User';

import { registerEntity } from '@appbase/core-backend';

export function bootstrap() {
    registerEntity(User);
}