import { DialogModule } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FwAlertModule,
  FwAppIconModule,
  FwAvatarModule,
  FwBadgeModule,
  FwBreadcrumbsModule,
  FwButtonModule,
  FwCardModule,
  FwChipModule,
  FwDialogsModule,
  FwIconButtonModule,
  FwIconModule,
  FwLayoutsModule,
  FwMenuModule,
  FwSectionHeadingModule,
  FwSelectMenuModule,
  FwStepperModule,
  FwTabsModule,
  FwTextInputModule,
  FwTooltipModule,
} from '@flywheel-io/vision';

import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './dashboard/news/news.component';
import { TenantDialogComponent } from './dashboard/tenant-dialog/tenant-dialog.component';
import {ThemeComponent} from "./theme/theme.component";
import {NewUserDialogContainerComponent} from "./users/components/new-user-dialog/new-user-dialog-container.component";

const baseHref = window.location.href.includes('https://flywheel-io.gitlab.io/product/frontend/vision/')
  ? 'https://flywheel-io.gitlab.io/product/frontend/vision/'
  : '/';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DashboardComponent,
    NewsComponent,
    TenantDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    NewUserDialogContainerComponent,
    BrowserAnimationsModule,
    BrowserModule,
    CdkMenuModule,
    DialogModule,
    FormsModule,
    FwAlertModule,
    FwAppIconModule,
    FwAvatarModule,
    FwBadgeModule,
    FwBreadcrumbsModule,
    FwButtonModule,
    FwCardModule,
    FwChipModule,
    FwDialogsModule,
    FwIconButtonModule,
    FwLayoutsModule,
    FwMenuModule,
    FwSectionHeadingModule,
    FwSelectMenuModule,
    FwStepperModule,
    FwTabsModule,
    FwTextInputModule,
    FwTooltipModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FwIconModule,
    ThemeComponent,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: baseHref},
    ApiService,
  ],
})
export class AppModule {
}
