import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import WaitingEmployeeData from '../server/waiting_employee.json';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { EmployeeDashboardComponent, DialogData } from '../employee-dashboard/employee-dashboard.component';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  department: string;
  job_title: string;
}

@Component({
  selector: 'app-delete-pop-up-from-add',
  templateUrl: './delete-pop-up-from-add.component.html',
  styleUrls: ['./delete-pop-up-from-add.component.css']
})
export class DeletePopUpFromAddComponent {
  private employees: Employee[] = WaitingEmployeeData;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog) {
    this.dialog = dialog;
  }

  public onCloseClick(): void {
    this.dialog.closeAll();
  }
  public openDialogAuthent(): void {
    this.dialog.open(AuthenticationComponent)
  }
  public getEmployees(): Employee[] {
    return this.employees;
  }

}
