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

  onCloseClick(): void {
    this.dialogRef.closeAll();
  }
  openDialogAuthent(): void {
    this.dialogRef.open(AuthenticationComponent)
  }
}
