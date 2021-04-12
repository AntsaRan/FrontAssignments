import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Output() assignDeleteEmit = new EventEmitter<Assignment>();
  assignmentTransmis: Assignment;

  constructor(public dialog: MatDialog, private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.getAssignementById();
  }

  getAssignementById() {
    const id: number = + this.route.snapshot.params.id;
    console.log(id + " id")
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
      })
  }
  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;

    this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      })
    //this.assignmentTransmis = null;*/
  }
  deleteAssignment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      id: this.assignmentTransmis.id,
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        if (data) {
          this.assignmentService.deleteAssignment(this.assignmentTransmis)
            .subscribe(message => {
              this.assignmentTransmis = null;
              this.router.navigate(["/home"]);
            })
        }
      }
    );
  }

  onclickEdit() {
    console.log(this.assignmentTransmis.id);
    this.router.navigate(["/assignment", this.assignmentTransmis.id, "edit"],
      {
        queryParams: {
          nom: 'Antsa',
          metier: 'Dév',
        },
        fragment: "edition"
      });
  }

  isAdmin() {
    const isadmin = localStorage.getItem('isadmin');
    var isADMIN: boolean = false;
    if (isadmin === "false") return isADMIN;
    return true;

  }

}
