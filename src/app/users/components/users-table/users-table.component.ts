import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {FwAvatarModule, FwChipModule, FwPaginatorModule} from '@flywheel-io/vision';

import {UsersTableColumns} from "./enums/users-table-columns.enum";
import {DataRow} from "../../interfaces/data-row.interface";
import {UsersTableStatusesEnum} from "./enums/users-table-statuses.enum";
import {AsyncPipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {UsersTableFiltersComponent} from "./users-table-filters/users-table-filters.component";
import {TableFilterPipe} from "../../pipes/table-filter.pipe";
import {InitialsPipe} from "../../pipes/initials.pipe";
import {BehaviorSubject} from "rxjs";
import {FwPaginatorEvent} from "@flywheel-io/vision/components/paginator/paginator.model";
import {PaginationPipe} from "../../pipes/pagination.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {UserEntity} from "../../interfaces/user.interface";

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        MatTableModule,
        FwChipModule,
        NgIf,
        TitleCasePipe,
        InitialsPipe,
        FwAvatarModule,
        UsersTableFiltersComponent,
        TableFilterPipe,
        MatSortModule,
        FwPaginatorModule,
        AsyncPipe,
        PaginationPipe,
        MatProgressSpinnerModule,
        MatIconModule
    ]
})
export class UsersTableComponent implements OnChanges {
    @Input() users: DataRow[] = [];
    @Input() loading: boolean;

    @Output() readonly editData = new EventEmitter<DataRow>();

    @ViewChild('matSort') readonly matSort = new MatSort();

    private defaultPagination: FwPaginatorEvent = {
        length: 0,
        pageSize: 10,
        pageIndex: 0,
        previousPageIndex: 0,
        rowIndexStart: 0,
        rowIndexEnd: 0,
    };

    protected readonly displayedColumns: string[] = [
        UsersTableColumns.Name,
        UsersTableColumns.Email,
        UsersTableColumns.Role,
        UsersTableColumns.Status,
        UsersTableColumns.Action,
    ];
    protected readonly usersTableStatusesEnum = UsersTableStatusesEnum;
    protected readonly usersTableColumns = UsersTableColumns;

    protected selectedRowsCount$ = new BehaviorSubject<number>(0);
    protected dataSource = new MatTableDataSource<DataRow>();
    protected selectedRow: Set<string> = new Set();
    protected filterSearch = '';
    protected filterStatus: UsersTableStatusesEnum = null;
    protected currentPagination: FwPaginatorEvent = this.defaultPagination;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['users']?.currentValue) {
            this.dataSource.data = this.users;
            this.dataSource.sort = this.matSort;
            this.currentPagination = {...this.currentPagination, length: this.dataSource.data.length};
        }
    }

    protected rowSelected(row: DataRow): void {
        if (this.selectedRow.has(row.id)) {
            this.selectedRow.delete(row.id);
        } else {
            this.selectedRow.add(row.id);
        }

        this.selectedRowsCount$.next(this.selectedRow.size);
    }

    protected onPageChange(page: FwPaginatorEvent): void {
        this.currentPagination = page;
    }

    protected onFilterSearch(search: string): void {
        this.filterSearch = search;
        this._resetPagination();
    }

    protected onFilterStatusSelect(status: UsersTableStatusesEnum): void {
        this.filterStatus = status;
        this._resetPagination();
    }

    protected sortChange(): void {
        this.dataSource = new MatTableDataSource<DataRow>();
        this.dataSource.data = this.users;
        this.dataSource.sort = this.matSort;
    }

    private _resetPagination(): void {
        this.currentPagination = {...this.defaultPagination};
    }
}
