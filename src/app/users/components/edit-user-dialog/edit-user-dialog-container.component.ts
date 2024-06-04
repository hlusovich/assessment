import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {EditUserDialogComponent} from "./edit-user-dialog.component";
import {UserEntity} from "../../interfaces/user.interface";
import {UsersDataService} from "../../services/users-data.service";
import {DataRow} from "../../interfaces/data-row.interface";

@Component({
    selector: 'app-edit-user-dialog-container',
    template: '<app-edit-user-dialog [user]="data" (close)="onClose($event)"></app-edit-user-dialog> ',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        EditUserDialogComponent
    ]
})
export class EditUserDialogContainerComponent {
    constructor(
        private dialogRef: DialogRef,
        private usersDataService: UsersDataService,
        @Inject(DIALOG_DATA) public data?: DataRow,
    ) {}

    protected onClose(user: UserEntity) : void {
        if(user) {
            this.usersDataService.updateUser(user);
        }

        this.dialogRef.close();
    }
}

