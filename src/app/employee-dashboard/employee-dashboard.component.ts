import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, Injectable } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
const EMPLOYEE_DATA: Employee[] = employeeData;
/**
 * @title Table with sorting
 */

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  
})
export class EmployeeDashboardComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'position',
    'hireDate',
    'department',
    ' ',
  ];
  dataSource = new MatTableDataSource(EMPLOYEE_DATA);
  employees: Employee[] = employeeData;
  private id_: number;


  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dialogRef: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  openDialogDel(Number: number): void {
    this.dialogRef.open(DeletePopupComponent);
    this.id_ =  Number
  }
  getData() {
    return this.id_;
  }

  openDialogEdit(): void {
    this.dialogRef.open(EditPopupComponent);
  }
  openDialogInfo(): void {
    this.dialogRef.open(EmployeeInfoComponent);
  }
  
}
