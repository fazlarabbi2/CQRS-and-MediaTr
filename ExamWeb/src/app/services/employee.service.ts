import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { EmployeeCreateModel } from '../models/employee/employee-create-models';
import { EmployeeGridModel } from '../models/employee/employee-grid-model';
import { EmployeeUpdateModel } from '../models/employee/employee-update-model';
import { EmployeeViewModel } from '../models/employee/employee-view-model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private appBaseUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  // Get Employees
  getAllAsync(): Observable<EmployeeGridModel[]> {
    const getAllAsyncUrl: string = `${this.appBaseUrl}employee/getAll`;
    let getEmployees: Observable<EmployeeGridModel[]> =
      this.httpClient.get<EmployeeGridModel[]>(getAllAsyncUrl);

    return getEmployees;
  }

  // Get Employees by Id
  getByIdAsync(id: number): Observable<EmployeeViewModel> {
    const getByIdAsyncUrl: string = `${this.appBaseUrl}employee/getById/${id}`;
    let getEmployee: Observable<EmployeeViewModel> =
      this.httpClient.get<EmployeeViewModel>(getByIdAsyncUrl);

    return getEmployee;
  }

  // Create Employe
  createAsync(
    createModel: EmployeeCreateModel
  ): Observable<EmployeeCreateModel> {
    const createAsyncUrl: string = `${this.appBaseUrl}employee/Create`;

    let createEmployee: Observable<EmployeeCreateModel> =
      this.httpClient.post<EmployeeCreateModel>(createAsyncUrl, createModel);

    return createEmployee;
  }

  // Update Employee
  updateAsync(
    updateModel: EmployeeUpdateModel
  ): Observable<EmployeeUpdateModel> {
    const updateAsyncUrl: string = `${this.appBaseUrl}employee/update`;
    let updateEmployee: Observable<EmployeeUpdateModel> =
      this.httpClient.put<EmployeeUpdateModel>(updateAsyncUrl, updateModel);

    return updateEmployee;
  }

  // Delete Employee by Id
  deleteAsync(id: number): Observable<boolean> {
    const deleteAsyncUrl: string = `${this.appBaseUrl}employee/delete/${id}`;
    let deleteEmployee: Observable<boolean> =
      this.httpClient.delete<boolean>(deleteAsyncUrl);

    return deleteEmployee;
  }
}
