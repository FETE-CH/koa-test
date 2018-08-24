import UserService from "./userService";
import mongodb from '../db/mongodb';

export default class UserServiceImp implements UserService {


    async geUserInfo(id: number) {
        const user = mongodb.get('user');
        const find = await user.find(1);
        return {};
    }

}
