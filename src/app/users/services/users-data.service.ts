import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, Subscription, switchMap, tap} from "rxjs";
import {DataRow} from "../interfaces/data-row.interface";
import {ApiService, User} from "../../api.service";
import {FwSnackbarService} from "@flywheel-io/vision";
import {UsersDataServiceActions} from "./enums/users-data-service-actions.enum";
import {UserEntity} from "../interfaces/user.interface";
import {UsersMapper} from "../api/users.mapper";
import {UsersDataActionInterface} from "./interfaces/users-data-action.interface";

@Injectable({
    providedIn: 'root',
})
export class UsersDataService {
    public _users$ = new BehaviorSubject<DataRow[]>([]);
    public _loading$ = new BehaviorSubject<boolean>(false);

    private _subscriptions: Subscription[] = [];
    private _usersController$ = new BehaviorSubject<UsersDataActionInterface>({type: UsersDataServiceActions.Default,});

    constructor(private api: ApiService,
                private snackbarService: FwSnackbarService,) {
    }

    get users$(): Observable<DataRow[]> {
        return this._users$.asObservable();
    }

    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public init() {
        this.getUsers();

        this._subscriptions.push(this._usersController$.asObservable().pipe(
            tap(() => {
                this._loading$.next(true);
            }),
            switchMap(action => {
                if (action.type === UsersDataServiceActions.GetUsers) {
                    return this._getUsersHandler();
                }

                if (action.type === UsersDataServiceActions.AddUsers) {
                    return this._addUsersHandler(action.payload);
                }

                if (action.type === UsersDataServiceActions.UpdateUser) {
                    return this._updateUserHandler(action.payload[0]);
                }

                return [];
            }), tap(() => {

                this._loading$.next(false);
            }),).subscribe());
    }

    public getUsers(): void {
        this._usersController$.next({type: UsersDataServiceActions.GetUsers});
    }

    public addUsers(payload: UserEntity[]): void {
        this._usersController$.next({type: UsersDataServiceActions.AddUsers, payload});
    }

    public updateUser(payload: UserEntity): void {
        this._usersController$.next({type: UsersDataServiceActions.UpdateUser, payload: [payload]});
    }

    public _addUsersHandler(users: UserEntity[]): Observable<DataRow[]> {
        const mappedUsers: Partial<User>[] = users.map(user => UsersMapper.toApiData(user));
        let user = mappedUsers.pop();

        const addUser = this.api.users.post(user).pipe(switchMap(() => {
            if (mappedUsers.length) {
                user = mappedUsers.pop();
                return addUser;
            }
            return this._getUsersHandler();
        }))

        return addUser;
    }

    public _updateUserHandler(user: UserEntity): Observable<DataRow[]> {
        const mappedUser = UsersMapper.toApiData(user);

        return this.api.users.put(user.id, mappedUser).pipe(switchMap(() => {
            return this._getUsersHandler();
        }))
    }

    public dispose() {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    private _getUsersHandler(): Observable<DataRow[]> {
        return this.api.users.query().pipe(map((res) => {
            this._users$.next(res);
            return res;
        }), catchError((res) => {
            console.error(res);
            this.snackbarService.show({message: res.error, severity: 'error'});
            this._users$.next([]);
            return [];
        }));
    }
}