import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import employeeData from '../employee.json';

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
export class EmployeeInfoComponent {
  constructor(
    private dialogRef: MatDialog,
  ){}
  employees: Employee[] = employeeData;
  selectedEmployee: Employee; 
  onSelect(employee: Employee) {
    this.selectedEmployee = employee;
  }
  openDialogEdit(): void {
    this.dialogRef.open(EditPopupComponent);
  }
  openDialogDel(Number: number): void {
    this.dialogRef.open(DeletePopupComponent);
  }

}
