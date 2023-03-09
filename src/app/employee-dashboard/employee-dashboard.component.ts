import { Component, ViewChild, Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import employeeData from '../server/employee.json';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

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
export interface DialogData {
  selected: number;
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

export class EmployeeDashboardComponent {
  private displayedColumns = ['id', 'first_name', 'email', 'job_title', 'department', 'salary', 'hireDate', 'icon'];
  private dataSource = new MatTableDataSource<Employee>();
  private employees: Employee[] = [];
  private collectionSize: number = 0;
  private employee: Employee[];
  private id: number;
  private selected: number;
  private routeQueryParams$: Subscription;

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  private dialogRef: MatDialog;

  constructor(dialogRef: MatDialog, private route: ActivatedRoute, private router: Router) {
    this.dialogRef = dialogRef;
    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialogInfo(this.id);
      }
    });
    this.initialize();
  }

  private initialize() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.first_name.toLowerCase().includes(filterValue) ||
        data.last_name.toLowerCase().includes(filterValue) ||
        data.email.toLowerCase().includes(filterValue) ||
        data.job_title.toLowerCase().includes(filterValue) ||
        data.department.toLowerCase().includes(filterValue)
      );
    };
    this.dataSource.filter = '';
    this.dataSource.data = employeeData;
    this.employees = employeeData;
    this.collectionSize = this.employees.length;
  }
  public getDataSource(): MatTableDataSource<Employee> {
    return this.dataSource;
  }
  public getDisplayedColumns() : string[]{
    return this.displayedColumns;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  public openDialogDel(ID: number): void {
    const dialogRef = this.dialogRef.open(DeletePopupComponent, {
      data: { selected: ID }
    });
    dialogRef.afterOpened().subscribe(result => {
      this.selected = ID;
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

  public openDialogEdit(): void {
    this.dialogRef.open(EditPopupComponent);
  }

  public openDialogInfo(ID: number): void {
    const dialogRef = this.dialogRef.open(EmployeeInfoComponent, {
      data: { selected: ID }
    });
    dialogRef.afterOpened().subscribe(result => {
      this.selected = ID;
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

  public goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}