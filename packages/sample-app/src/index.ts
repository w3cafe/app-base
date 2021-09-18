import { registerModule, startServerApp } from '@appbase/core-backend';
import UserModule from '@appbase/module-user';

registerModule(UserModule);
startServerApp();