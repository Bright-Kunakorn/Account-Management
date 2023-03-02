import { Component } from '@angular/core';
import employeeData from '../employee.json';

interface Employee {
  id: Number;
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  position: String;
  salary: Number;
  hireDate: String;
  department: String;

}

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent {
  employees: Employee[] = employeeData;

}
