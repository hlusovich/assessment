import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {UsersTableStatusesEnum} from "../enums/users-table-statuses.enum";
import {FwButtonModule, FwMenuModule, FwTextInputModule} from "@flywheel-io/vision";
import {CdkMenuModule} from "@angular/cdk/menu";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
    selector: 'app-users-table-filters',
    templateUrl: './users-table-filters.component.html',
    styleUrls: ['./users-table-filters.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FwMenuModule,
        CdkMenuModule,
        NgForOf,
        FormsModule,
        FwButtonModule,
        FwTextInputModule
    ]
})
export class UsersTableFiltersComponent {
    @Output() readonly search = new EventEmitter<string>();
    @Output() readonly selectStatus = new EventEmitter<UsersTableStatusesEnum>();

    public readonly menuItems: UsersTableStatusesEnum[] = [
        UsersTableStatusesEnum.AllStatus,
        UsersTableStatusesEnum.Active,
        UsersTableStatusesEnum.Deactivated];

    public searchValue = '';
    public selectedMenuItem: UsersTableStatusesEnum = null;

    public onSearch(): void {
        this.search.emit(this.searchValue.trim());
    }

    public onMenuItemSelect(menuItem: UsersTableStatusesEnum): void {
        this.selectedMenuItem = this.selectedMenuItem === menuItem ? null : menuItem;
        this.selectStatus.emit(this.selectedMenuItem);
    }
}
