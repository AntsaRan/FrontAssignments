import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NotationComponent } from 'src/app/shared/notation/notation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnnulationRenduComponent } from '../shared/annulation-rendu/annulation-rendu.component';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  // ajoutActive = false;
  assignmentSelect: Assignment;
  assignments: Assignment[];
  spinnershow = true;
  nodata = false;
  page: number = 1;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  pageSizeOptions: number[] = [5, 10, 25];
  limit: number;
  imageUrl: string = "../../assets/img/";

  /* DRAG AND DROP */

  nonrendu: Assignment[];
  rendu: Assignment[];
  assignDrag: Assignment;
  //injection service
  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log('AVANT AFFICHAGE');
    /*
    setTimeout(() => {
      this.ajoutActive = true;
    }, 3000);
    */
    /* if (this.assignments.length==0){
       this.nodata=true;
     }*/
    const iduser = localStorage.getItem('currentUser');
    const idToken = localStorage.getItem('currentToken');
    console.log(idToken + " token " + iduser + " user");
    this.route.queryParams.subscribe(queryparams => {
      this.page = queryparams.page || 1;
      this.limit = queryparams.limit || 10;
      this.getAssignments();
    })
    this.rendu = [];
    this.nonrendu = [];

  }

  assignmentClique(a) {
    this.assignmentSelect = a;
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.limit = data.limit;
        this.assignments = data.docs;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.spinnershow = false;

        this.assignments.forEach(assignment => {
          if (assignment.rendu) {
            this.rendu.push(assignment);
          } else {
            this.nonrendu.push(assignment);
          }
        })
      });
  }

  getAssignmentsSeach(search: string) {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.limit = data.limit;
        this.assignments = data.docs;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.spinnershow = false;

        console.log("données reçues o");
      });
  }


  Prev() {
    /*  this.page = this.prevPage;
      this.getAssignments();*/
    this.router.navigate(["/home"],
      {
        queryParams: {
          page: this.prevPage,
          limit: this.limit,
        },
      });

  }

  Next() {
    /*
    this.page=this.nextPage;
    this.getAssignments();
*/
    this.router.navigate(["/home"],
      {
        queryParams: {
          page: this.nextPage,
          limit: this.limit,
        },
      });
  }
  FirstP() {
    /*this.page = 1;
    this.getAssignments();*/
    this.router.navigate(["/home"],
      {
        queryParams: {
          page: 1,
          limit: this.limit,
        },
      });
  }
  LastP() {
    /*this.page = this.totalPages;
    this.getAssignments();*/
    this.router.navigate(["/home"],
      {
        queryParams: {
          page: this.totalPages,
          limit: this.limit,
        },
      });
  }
  torendu(event: CdkDragDrop<string[]>) {
    console.log(" TORENDU");

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = event.previousContainer.data[event.previousIndex]['_id'];
      let assignment = new Assignment();
      assignment = this.getAssignementById(id);
      assignment._id = id;
      //this.assignmentsService.updateAssignment(assignment);
      this.notation(assignment);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  tononrendu(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const id = event.previousContainer.data[event.previousIndex]['_id'];
      let assignment = new Assignment();
      assignment = this.getAssignementById(id);
      assignment._id = id;
      //this.assignmentsService.updateAssignment(assignment);
      this.nonRendu(assignment);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }
  }
  getAssignementById(id): Assignment {
    let assignment = new Assignment();
    this.assignmentsService.getAssignment(id)
      .subscribe(a => {
        assignment = a;
      })
    return assignment;
  }

  notation(assignment: Assignment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      //id: this.assignmentTransmis.id,
    };
    const dialogRef = this.dialog.open(NotationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        if (data != null) {
          assignment.note = data;
          assignment.rendu = true;
          this.assignmentsService.updateAssignment(assignment)
            .subscribe(m => {
              console.log(m);
              this.reloadComponent();
            })
        }
      }
    );
  }

  nonRendu(assignment: Assignment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AnnulationRenduComponent);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          assignment.note = null;
          assignment.rendu = false;
          this.assignmentsService.updateAssignment(assignment)
            .subscribe(m => {
              console.log(m);
              this.reloadComponent();
            })
        }
      }
    );
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
}