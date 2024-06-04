import {UserEntity} from "../interfaces/user.interface";
import {User} from "../../api.service";
import {UsersTableStatusesEnum} from "../components/users-table/enums/users-table-statuses.enum";

export class UsersMapper {
    public static toApiData(user: UserEntity): Partial<User> {
        return {
            name: [user.firstName, user.lastName].join(' '),
            email: user.email,
            role: user.role,
            status: UsersTableStatusesEnum.Active.toLowerCase(),
        }
    }
}