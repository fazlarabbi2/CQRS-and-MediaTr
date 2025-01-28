import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeCreateModel } from 'src/app/models/employee/employee-create-models';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit {
  // Employee Create Model
  employeeCreateModel: EmployeeCreateModel = new EmployeeCreateModel();

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {}

  // Create Employee
  onClickUpsertCountry(): void {
    let isEmployeeCreateFormValidate: boolean =
      this.getValidateEmployeeCreateFromResult();

    if (isEmployeeCreateFormValidate) {
      this.spinnerService.show();
      this.employeeService.createAsync(this.employeeCreateModel).subscribe(
        (res: EmployeeCreateModel) => {
          this.spinnerService.hide();
          this.toastrService.success('Employee created.', 'Success');
          this.resetEmployeeCreateFrom();
          return;
        },
        (error: any) => {
          this.spinnerService.hide();
          this.toastrService.error(
            'Employee cannot created! Please, try again.',
            'Error'
          );
        }
      );
    }
  }

  private getValidateEmployeeCreateFromResult(): boolean {
    if (
      this.employeeCreateModel.name == undefined ||
      this.employeeCreateModel.name == null ||
      this.employeeCreateModel.name == ''
    ) {
      this.toastrService.warning('Please, provide name.', 'Warning');
      return false;
    }

    return true;
  }

  // Reset employee create form
  private resetEmployeeCreateFrom(): void {
    this.employeeCreateModel = new EmployeeCreateModel();
  }
}
