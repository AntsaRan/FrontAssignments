import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css']
})
export class NotationComponent implements OnInit {
  res:number=null;
  note:number;
  constructor(private dialogRef: MatDialogRef<NotationComponent>,@Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close(this.res);
  }
  onSubmit() {
    this.res=this.note;
    this.dialogRef.close(this.res);
  }
}
