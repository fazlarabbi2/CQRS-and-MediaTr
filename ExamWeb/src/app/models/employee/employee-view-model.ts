import { EmployeeCreateModel } from './employee-create-models';
import { EmployeeGridModel } from './employee-grid-model';
import { EmployeeUpdateModel } from './employee-update-model';

export class EmployeeViewModel {
  createModel: EmployeeCreateModel = new EmployeeCreateModel();
  updateModel: EmployeeUpdateModel = new EmployeeUpdateModel();
  gridModel: EmployeeGridModel = new EmployeeGridModel();
}
