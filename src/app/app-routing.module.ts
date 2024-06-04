import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThemeComponent} from './theme/theme.component';

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'theme', component: ThemeComponent},
    {path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        {
            preloadingStrategy: PreloadAllModules
        })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
