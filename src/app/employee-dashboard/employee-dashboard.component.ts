import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, Injectable , HostListener, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import employeeData from '../employee.json';
import { HttpClient } from '@angular/common/http';

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

export class EmployeeDashboardComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource(EMPLOYEE_DATA);
  employees: Employee[] = employeeData;
  collectionSize = this.employees.length;
  private id_: number;
  page: number = 1;
  pageSize = 10;
  searchTerm: string;
  currentRate = 8;
  employee: Employee[];
  allEmployee: Employee[];
  searchText: any;

  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dialogRef: MatDialog,
    private http: HttpClient
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
  ngOnInit(): void {
    this.http.get<Employee[]>('../employee.json')
      .subscribe((data: Employee[]) => {
        this.collectionSize = data.length;
        this.employee = data;
        this.allEmployee = this.employees;
      });
  }
  search(value: string): void {
    this.employees = this.allEmployee.filter((val) => val.first_name.toLowerCase().includes(value));
    this.collectionSize = this.employees.length;
  }

  showGoToTopButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showGoToTopButton = window.pageYOffset > 0;
  }

  goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
