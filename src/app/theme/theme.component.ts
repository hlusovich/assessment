import {DOCUMENT, NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import { Component, Inject, Input, Renderer2 } from '@angular/core';
import {MenuComponent} from "./menu/menu.component";
import {HeaderComponent} from "./header/header.component";
import {
    FwAppIconModule,
    FwBreadcrumbsModule,
    FwIconModule,
    FwLayoutsModule,
    FwMenuModule,
    FwSnackbarModule
} from "@flywheel-io/vision";
import {ToolbarComponent} from "./toolbar/toolbar.component";

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    standalone: true,
    imports: [
        FwSnackbarModule,
        FwMenuModule,
        FwIconModule,
        MenuComponent,
        HeaderComponent,
        NgClass,
        NgIf,
        NgTemplateOutlet,
        FwLayoutsModule,
        FwAppIconModule,
        FwBreadcrumbsModule,
        ToolbarComponent,
    ],
})
export class ThemeComponent {
    @Input() layout: string = 'central'
    @Input() page: 'light' | 'shaded' = 'light'

    title = 'project-vision';
    theme = 'vision-light-theme'; // set this to 'vision-dark-theme' to enable dark mode
    renderer: Renderer2;

    constructor(@Inject(DOCUMENT) document: Document, r: Renderer2) {
        this.renderer = r;
        r.addClass(document.body, this.theme);
    }

    handleThemeToggle(): void {
        if (this.theme === 'vision-light-theme') {
            this.theme = 'vision-dark-theme';
            this.renderer.removeClass(document.body, 'vision-light-theme');
            this.renderer.addClass(document.body, this.theme);
        } else {
            this.theme = 'vision-light-theme';
            this.renderer.removeClass(document.body, 'vision-dark-theme');
            this.renderer.addClass(document.body, this.theme);
        }
    }
}
