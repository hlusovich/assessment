import {Component} from '@angular/core';
import {FwIconModule, FwMenuModule} from "@flywheel-io/vision";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
    imports: [
        FwMenuModule,
        FwIconModule,
    ]
})
export class MenuComponent {
    collapsed: boolean = false;

    constructor() {
    }

}
