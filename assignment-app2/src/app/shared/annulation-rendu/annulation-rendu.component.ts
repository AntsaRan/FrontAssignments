import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-annulation-rendu',
  templateUrl: './annulation-rendu.component.html',
  styleUrls: ['./annulation-rendu.component.css']
})
export class AnnulationRenduComponent implements OnInit {
  res:boolean=false;
  constructor(private dialogRef: MatDialogRef<AnnulationRenduComponent>,@Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(this.res);
  }
  Oui() {
    this.res=true;
    this.dialogRef.close(this.res);

  }

}
