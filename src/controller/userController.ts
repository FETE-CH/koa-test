import AsyncMysql from '../db';
import UserServiceImp from '../service/userServiceImp';
import UserService from '../service/userService';


export class userController {
     login(ctx) {
        // await asyncMysql.getInstance().get();
        const userService: UserService = new UserServiceImp();

    }

};

