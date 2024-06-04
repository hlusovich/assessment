import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  FwSnackbarService,
  FwSnackbarMessage,
  FwLayoutsModule,
  FwIconButtonModule,
  FwMenuModule, FwAvatarModule
} from '@flywheel-io/vision'
import {CdkMenuModule} from "@angular/cdk/menu";
import {RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    FwLayoutsModule,
    FwIconButtonModule,
    CdkMenuModule,
    FwMenuModule,
    FwAvatarModule,
    RouterLinkActive
  ]
})
export class ToolbarComponent {
  @Output() themeToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog, private snackbarService: FwSnackbarService) {
  }


  handleModeToggle(): void {
    this.themeToggle.emit(true);
  }

  addMessages(): void {
    const messages: FwSnackbarMessage[] = [
      { message: 'This is a info message', severity: 'info' },
      { message: 'This is a success message', severity: 'success' },
      { message: 'This is a warning message', severity: 'warning', actionText: 'retry', action: () => alert('retrty') },
      { message: 'This is an error message', severity: 'error' },
    ];
    this.snackbarService.show({
      ...messages[Math.floor(Math.random() * messages.length)],
    });
  }

}
