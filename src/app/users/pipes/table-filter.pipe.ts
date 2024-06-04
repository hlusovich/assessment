import {Pipe, PipeTransform} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {DataRow} from "../interfaces/data-row.interface";
import {UsersTableStatusesEnum} from "../components/users-table/enums/users-table-statuses.enum";

@Pipe({name: 'tableFilter', pure: true, standalone: true})
export class TableFilterPipe implements PipeTransform {
    public transform(
        tableData: MatTableDataSource<DataRow>,
        filter: string,
        status: UsersTableStatusesEnum,
        ): MatTableDataSource<DataRow> {
        const trimmedFilter = filter.trim();

        if (!trimmedFilter && !status) {
            return tableData;
        }

        const preparedFilter = trimmedFilter.toLowerCase();
        const preparedStatus = status ? status.toLowerCase() : null;

        const filteredData = tableData.data.filter((row) => {
            return (!trimmedFilter || row.name.toLowerCase().includes(preparedFilter)) && (!status || row.status.toLowerCase() === preparedStatus);
        });

        const dataSource = new MatTableDataSource<DataRow>();
        dataSource.data = filteredData;
        dataSource.sort = dataSource.sort;

        return dataSource;
    }
}