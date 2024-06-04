import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

import { DialogWidth } from '@flywheel-io/vision';

@Component({
  selector: 'app-tenant-dialog',
  templateUrl: './tenant-dialog.component.html',
  styleUrls: ['./tenant-dialog.component.scss'],
})
export class TenantDialogComponent {
  protected readonly DialogWidth = DialogWidth;
  tenants = [
    { title: 'Flywheel-Lab 1', value: 'fw1' },
    { title: 'Flywheel-Lab 2', value: 'fw2' },
  ];
  selectedTenant = this.tenants[0];

  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data?: DialogData,
  ) {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  select(): void {
    this.dialogRef.close();
  }
}

export class DialogData {

}
