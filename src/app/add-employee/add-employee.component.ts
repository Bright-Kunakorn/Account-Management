import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import WaitingEmployeeData from '../waiting_employee.json';
import { InfoAddEmployeeComponent } from '../info-add-employee/info-add-employee.component';
import { DeletePopUpFromAddComponent } from '../delete-pop-up-from-add/delete-pop-up-from-add.component';

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
  displayedColumns = ['id', 'avatar', 'first_name', 'email', 'job_title', 'icon'];
  dataSource = new MatTableDataSource(EMPLOYEE_DATA);
  employees: Employee[] = WaitingEmployeeData;
  collectionSize = this.employees.length;
  private id: number;
  selected: number;
  routeQueryParams$: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialog, private route: ActivatedRoute, private router: Router) {
    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params['dialog']) {
        this.openDialogInfo(this.id);
      }
    });
  }
  private employeeInfo: InfoAddEmployeeComponent;

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
    const dialogRef = this.dialogRef.open(DeletePopUpFromAddComponent, {
      data: { selected: ID }
    });

    dialogRef.afterOpened().subscribe(result => {
      this.selected = ID;
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

  public getID() {
    return this.id;
  }
  public setID(ID: number) {
    this.id = ID;
  }

  public openDialogEdit(): void {
    this.dialogRef.open(EditPopupComponent);
  }
  public openDialogInfo(ID: number): void {
    const dialogRef = this.dialogRef.open(InfoAddEmployeeComponent, {
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
