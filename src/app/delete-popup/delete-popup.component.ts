import { Component } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {
  constructor(
    private dialogRef: MatDialog,
    private employee: EmployeeDashboardComponent
    ){}  
  public id = this.employee.id;
  public onCloseClick(): void {
    this.dialogRef.closeAll();
  }
  public openDialogAuthent(): void {
    this.dialogRef.open(AuthenticationComponent)
  }
}
