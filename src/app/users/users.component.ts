import {ChangeDetectionStrategy, Component} from '@angular/core';

import {
    FwAvatarModule,
    FwButtonModule,
    FwChipModule,
    FwDialogService,
    FwIconModule,
    FwMenuModule,
    FwSectionHeadingModule,
    FwTextInputModule
} from '@flywheel-io/vision';
import {CommonModule} from "@angular/common";
import {TableFilterPipe} from "./pipes/table-filter.pipe";
import {CdkMenuModule} from "@angular/cdk/menu";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {ThemeComponent} from "../theme/theme.component";
import {UsersTableFiltersComponent} from "./components/users-table/users-table-filters/users-table-filters.component";
import {UsersTableContainerComponent} from "./components/users-table/users-table-container.component";
import {NewUserDialogContainerComponent} from "./components/new-user-dialog/new-user-dialog-container.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TableFilterPipe,
        UsersTableFiltersComponent,
        CdkMenuModule,
        FwAvatarModule,
        FwButtonModule,
        FwChipModule,
        FwIconModule,
        FwMenuModule,
        FwSectionHeadingModule,
        FwTextInputModule,
        MatSortModule,
        MatTableModule,
        FormsModule,
        ThemeComponent,
        UsersTableContainerComponent,
    ]
})
export class UsersComponent {

    constructor(private dialog: FwDialogService) {}

    public openNewUserDialog(): void {
        this.dialog.openDialog(NewUserDialogContainerComponent, {
            data: {},
        });
    }

}
