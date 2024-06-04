import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {UsersDataService} from "../../services/users-data.service";
import {UsersTableComponent} from "./users-table.component";
import {FwDialogService} from "@flywheel-io/vision";
import {EditUserDialogContainerComponent} from "../edit-user-dialog/edit-user-dialog-container.component";
import {DataRow} from "../../interfaces/data-row.interface";

@Component({
    selector: 'app-users-table-container',
    template: `
        <app-users-table
                [loading]="usersDataService.loading$ | async"
                [users]="usersDataService.users$ | async"
                (editData)="onDataEdit($event)"
        >
        </app-users-table>`,
    standalone: true,
    imports: [
        UsersTableComponent,
        AsyncPipe,
    ]
})
export class UsersTableContainerComponent implements OnInit, OnDestroy{

    constructor(
        protected usersDataService: UsersDataService,
        private dialog: FwDialogService
    ) {}

    public ngOnInit(): void {
        this.usersDataService.init();
    }

    public ngOnDestroy(): void {
        this.usersDataService.dispose();
    }

    public onDataEdit(data: DataRow): void {
        this.dialog.openDialog(EditUserDialogContainerComponent, {
            data,
        });
    }
}
