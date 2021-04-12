import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  res:boolean=false;
  constructor(private dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(this.res);
  }
  supprimer() {
    this.res=true;
    this.dialogRef.close(this.res);

  }
}
