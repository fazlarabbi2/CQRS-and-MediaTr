import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeUpdateModel } from 'src/app/models/employee/employee-update-model';
import { EmployeeViewModel } from 'src/app/models/employee/employee-view-model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
})
export class EmployeeUpdateComponent implements OnInit {
  // Employee Update Model
  employeeUpdateModel: EmployeeUpdateModel = new EmployeeUpdateModel();
  private _employeeId: number | undefined;

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private spinerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get employee id by url
    this.getEmployeeByUrl();

    // Get employee by id
    this.getEmployeeById();
  }

  private getEmployeeByUrl(): void {
    this.activatedRoute.params.subscribe((params) => {
      this._employeeId = +params['recordId'];
    });
  }

  // Get Employee by Id
  private getEmployeeById(): void {
    this.spinerService.show();
    this.employeeService
      .getByIdAsync(this._employeeId!)
      .subscribe((res: EmployeeViewModel) => {
        this.employeeUpdateModel = res.updateModel;
        this.spinerService.hide();
      });
  }

  onClickEmployeeUpdate(): void {
    let isEmployeeFormValidate: boolean = this.getEmployeeFormValidateResult();

    if (isEmployeeFormValidate) {
      this.spinerService.show();
      this.employeeService.updateAsync(this.employeeUpdateModel).subscribe(
        (res: EmployeeUpdateModel) => {
          this.spinerService.hide();
          this.toastrService.success(
            'Employee update successfull.',
            'Successfull.'
          );
          return this.router.navigate(['/employees']);
        },
        (error: any) => {
          this.spinerService.hide();
          this.toastrService.error(
            'Employee cannot updated! Please, try again.',
            'Error'
          );
        }
      );
    }
  }

  private getEmployeeFormValidateResult(): boolean {
    if (
      this.employeeUpdateModel.name == undefined ||
      this.employeeUpdateModel.name == null ||
      this.employeeUpdateModel.name == ''
    ) {
      this.toastrService.warning('Please, provide name.', 'Warning');
      return false;
    }
    return true;
  }
}
