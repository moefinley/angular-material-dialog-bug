import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material-dialog';
  dialogRef: MatDialogRef<DialogComponent, any> | undefined;

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
