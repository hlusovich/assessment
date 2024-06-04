import {Pipe, PipeTransform} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {DataRow} from "../interfaces/data-row.interface";
import {FwPaginatorEvent} from "@flywheel-io/vision/components/paginator/paginator.model";

@Pipe({name: 'pagination', pure: true, standalone: true})
export class PaginationPipe implements PipeTransform {
    public transform(tableData: MatTableDataSource<DataRow>, pagination: FwPaginatorEvent): MatTableDataSource<DataRow> {
        if(!pagination) {
            return tableData;
        }

        const dataSource = new MatTableDataSource<DataRow>();
        dataSource.sort = tableData.sort;
        dataSource.data = tableData.data.slice(pagination.rowIndexStart, pagination.rowIndexStart + pagination.pageSize);

        return dataSource;
    }
}