import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {FwAppIconModule, FwBreadcrumbsModule, FwLayoutsModule} from "@flywheel-io/vision";
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    FwLayoutsModule,
    FwAppIconModule,
    FwBreadcrumbsModule,
    ToolbarComponent
  ]
})
export class HeaderComponent {

  @Output() themeToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {}

  handleModeToggle(): void {
    this.themeToggle.emit(true);
  }

}
