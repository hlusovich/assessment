import { Component } from '@angular/core';

import { FwDialogService } from '@flywheel-io/vision';
import { TenantDialogComponent } from './tenant-dialog/tenant-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(public dialog: FwDialogService) {

  }

  openTenantDialog(): void {
    this.dialog.openDialog(TenantDialogComponent, {
      data: {},
    });
  }

  openUrl(url: string): void {
    window.open(url);
  }
}
