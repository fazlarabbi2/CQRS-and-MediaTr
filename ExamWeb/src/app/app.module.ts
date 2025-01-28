import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryCreateComponent } from './components/country/country-create/country-create.component';
import { CountryListComponent } from './components/country/country-list/country-list.component';
import { CountryUpdateComponent } from './components/country/country-update/country-update.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';

@NgModule({ declarations: [
        AppComponent,
        CountryListComponent,
        CountryCreateComponent,
        CountryUpdateComponent,
        EmployeeListComponent,
        EmployeeCreateComponent,
        EmployeeUpdateComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
