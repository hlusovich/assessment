import {UsersDataServiceActions} from "../enums/users-data-service-actions.enum";
import {UserEntity} from "../../interfaces/user.interface";

export  interface UsersDataActionInterface {
    type: UsersDataServiceActions,
    payload?: UserEntity[]
}