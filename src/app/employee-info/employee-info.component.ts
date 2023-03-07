import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import employeeData from '../employee.json';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';

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
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent  {
  [x: string]: any;
  private dialogRef: MatDialog;
  private employees: Employee[] = employeeData;

  @Input() selectedEmployee:number;
  
  constructor(dialogRef: MatDialog, public employeeDashboard: EmployeeDashboardComponent) {
    this.dialogRef = dialogRef;
    console.log(employeeDashboard.getID());
    console.log(this.selectedEmployee);
  }
  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });
  }
  public setSelect(id:number): void{
    this.selectedEmployee = this.employeeDashboard.id;
  }
  public getSelect(): number{
    return this.selectedEmployee;
  }

  public openDialogEdit(): void {
    this.dialogRef.open(EditPopupComponent);
  }

  public openDialogDel(ID: number): void {
    this.dialogRef.open(DeletePopupComponent);
  }

  public getEmployees(): Employee[] {
    return this.employees;
  }
}