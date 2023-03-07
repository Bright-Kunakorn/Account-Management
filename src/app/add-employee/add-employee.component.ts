import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import WaitingEmployeeData from '../waiting_employee.json';
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
const EMPLOYEE_DATA: Employee[] = WaitingEmployeeData;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  displayedColumns = ['id','avatar', 'first_name', 'email', 'job_title' ,'icon'];
  dataSource = new MatTableDataSource(EMPLOYEE_DATA);
  employees: Employee[] = WaitingEmployeeData;
  collectionSize = this.employees.length;
  private   id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialogRef: MatDialog,
  ) {
    this.dialogRef = dialogRef;
  }
  private employeeInfo: EmployeeInfoComponent;
  
  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  public openDialogDel(ID: number): void {
    this.dialogRef.open(DeletePopupComponent);
  }
  public getID() {
    return this.id;
  }
  public setID(ID: number){
    this.id = ID;
  }

  public openDialogEdit(): void {
    this.dialogRef.open(EditPopupComponent);
  }
  public openDialogInfo(ID: number): number {
    this.dialogRef.open(EmployeeInfoComponent);
    this.employeeInfo.setSelect(ID);
    return ID;
  }
  public goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
}
}
