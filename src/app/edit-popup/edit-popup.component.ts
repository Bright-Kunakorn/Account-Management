import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from '../authentication/authentication.component';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})

export class EditPopupComponent {
  constructor(public dialog: MatDialog){
  }
  roles: Role[] = [
    {value: 'accountant', viewValue: 'Accountant'},
    {value: 'market-manager', viewValue: 'Market Manager'},
    {value: 'software-engineer', viewValue: 'Software Engineer'},
    {value: 'marketing-coordinator', viewValue: 'Marketing Coordinator'},
    {value: 'software-developer	', viewValue: 'Software Developer'},
    {value: 'sales-manager', viewValue: 'Sales Manager'},
    {value: 'human-resources-manager', viewValue: 'Human Resources Manager'},
    {value: 'sales-representative', viewValue: 'Sales Representative'},
    
  ];
  public onCloseClick(): void {
    this.dialog.closeAll();
  }
  public openDialogAuthent(): void {
    this.dialog.open(AuthenticationComponent)
  }

}
