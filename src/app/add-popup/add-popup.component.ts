import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css']
})
export class AddPopupComponent {
  constructor(private dialog: MatDialog) {}

  onCloseClick(): void {
    this.dialog.closeAll();
  }

}
