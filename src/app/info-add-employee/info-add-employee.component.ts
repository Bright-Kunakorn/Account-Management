import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DialogData, EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';
import WaitingEmployeeData from '../server/waiting_employee.json';

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
  salary: string;
  hireDate: string;
  birthDate: string;
  educate: string;
}
@Component({
  selector: 'app-info-add-employee',
  templateUrl: './info-add-employee.component.html',
  styleUrls: ['./info-add-employee.component.css']
})
export class InfoAddEmployeeComponent {
  [x: string]: any;
  private employees: Employee[] = WaitingEmployeeData;
  public selectedEmployee: number;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogRef = dialogRef;
  }
  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });
  }
  public setSelect(id: number): void {
    this.selectedEmployee = this.employeeDashboard.id;
  }
  public getSelect(): number {
    return this.selectedEmployee;
  }

  public openDialogEdit(): void {
    this.dialog.open(EditPopupComponent);
  }

  public openDialogDel(ID: number): void {
    this.dialog.open(DeletePopupComponent);
    this.id = ID;
  }

  public getEmployees(ID : number): Employee[] {
    return this.employees.filter(employee => employee.id === ID)
  }
}