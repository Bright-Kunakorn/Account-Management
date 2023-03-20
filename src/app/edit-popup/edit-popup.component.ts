import { Component, Inject } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  DialogData,
  EmployeeDashboardComponent,
} from '../employee-dashboard/employee-dashboard.component';
import employeeData from '../server/employee.json';
interface Role {
  value: string;
  viewValue: string;
}
interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar: string;
  street: string;
  city: string;
  department: string;
  job_title: string;
  gender: string;
  salary: number;
  hireDate: string;
  birthDate: string;
  educate: string;
}

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css'],
})
export class EditPopupComponent {
  private employees: Employee[] = employeeData;
  roles: Role[] = [
    { value: 'accountant', viewValue: 'Accountant' },
    { value: 'market-manager', viewValue: 'Market Manager' },
    { value: 'software-engineer', viewValue: 'Software Engineer' },
    { value: 'marketing-coordinator', viewValue: 'Marketing Coordinator' },
    { value: 'software-developer', viewValue: 'Software Developer' },
    { value: 'sales-manager', viewValue: 'Sales Manager' },
    { value: 'human-resources-manager', viewValue: 'Human Resources Manager' },
    { value: 'sales-representative', viewValue: 'Sales Representative' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EmployeeDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog
  ) {
    this.dialog = dialog;
  }

  onCloseClick(): void {
    this.dialog.closeAll();
  }

  openDialogAuthent(): void {
    this.dialog.open(AuthenticationComponent);
  }
  public getEmployees(ID: number): Employee[] {
    return this.employees.filter((employee) => employee.id === ID);
  }
}
export class EditPopup {
  private dialog: MatDialog;
  private employees: Employee[];

  constructor(
    private dialogRef: MatDialogRef<EmployeeDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.employees = employeeData;
  }

  public onCloseClick(): void {
    this.dialog.closeAll();
  }

  public openDialogAuthent(): void {
    this.dialog.open(AuthenticationComponent);
  }

  public getEmployees(ID: number): Employee[] {
    return this.employees.filter((employee) => employee.id === ID);
  }
}
