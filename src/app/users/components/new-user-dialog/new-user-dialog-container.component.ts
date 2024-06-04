import {DialogRef} from '@angular/cdk/dialog';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NewUserDialogComponent} from "./new-user-dialog.component";
import {UserEntity} from "../../interfaces/user.interface";
import {UsersDataService} from "../../services/users-data.service";

@Component({
    selector: 'app-new-user-dialog-container',
    template: '<app-new-user-dialog (close)="onClose($event)"></app-new-user-dialog> ',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NewUserDialogComponent
    ]
})
export class NewUserDialogContainerComponent {
    constructor(
        private dialogRef: DialogRef,
        private usersDataService: UsersDataService,
    ) {}

    protected onClose(users: UserEntity[]) : void {
        if(users) {
            this.usersDataService.addUsers(users);
        }

        this.dialogRef.close();
    }
}

