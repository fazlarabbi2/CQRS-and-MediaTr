import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeGridModel } from 'src/app/models/employee/employee-grid-model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  // Employees Data Source
  employee: EmployeeGridModel[] = [];

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  // Get Employees
  private getEmployees(): void {
    this.spinnerService.show();
    this.employeeService.getAllAsync().subscribe(
      (result: EmployeeGridModel[]) => {
        this.employee = result;
        this.spinnerService.hide();
      },
      (error: any) => {
        this.spinnerService.hide();
        this.toastrService.error(
          'Employee cannot load! Please, try again.',
          'Error'
        );
      }
    );
  }

  // Delete Employee
  onClickDelete(employeeId: number): void {
    this.spinnerService.show();
    this.employeeService.deleteAsync(employeeId).subscribe(
      (res: boolean) => {
        this.spinnerService.hide();
        this.getEmployees();
        return this.toastrService.success(
          'Employee delete successfull.',
          'Success.'
        );
      },
      (error: any) => {
        this.spinnerService.hide();
        return this.toastrService.error(
          'Employee cannot deleted! Please, try again.',
          'Error'
        );
      }
    );
  }
}
