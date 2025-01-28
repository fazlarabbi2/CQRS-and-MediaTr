import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryCreateComponent } from './components/country/country-create/country-create.component';
import { CountryListComponent } from './components/country/country-list/country-list.component';
import { CountryUpdateComponent } from './components/country/country-update/country-update.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';

const routes: Routes = [
  // For not match url
  { path: '', component: CountryListComponent, pathMatch: 'full' },
  { path: '*', component: CountryListComponent, pathMatch: 'full' },

  // For country
  { path: 'countries', component: CountryListComponent, pathMatch: 'full' },
  {
    path: 'country/create',
    component: CountryCreateComponent,
    pathMatch: 'full',
  },
  {
    path: 'country/update/:recordId',
    component: CountryUpdateComponent,
    pathMatch: 'full',
  },
  { path: 'employees', component: EmployeeListComponent, pathMatch: 'full' },
  {
    path: 'employees/create',
    component: EmployeeCreateComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee/update/:recordId',
    component: EmployeeUpdateComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
