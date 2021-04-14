import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NotationComponent } from 'src/app/shared/notation/notation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnnulationRenduComponent } from '../shared/annulation-rendu/annulation-rendu.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  // ajoutActive = false;
  assignmentSelect: Assignment;
  assignments: Assignment[];
  assignmentsScroll: Assignment[]=[];
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

  /* scrolling */
  pageScr: number = 1;
  totalPagesScr: number;
  hasNextPageScr: boolean;
  hasPrevPageScr: boolean;
  nextPageScr: number;
  prevPageScr: number;
  pageSizeOptionsScr: number[] = [5, 10, 25];
  limitScr: number;

  /*  --------------------- */

  imageUrl: string = "../../assets/img/";


  @ViewChild("scroller")
  scroller!: CdkVirtualScrollViewport;
  /* DRAG AND DROP */

  nonrendu: Assignment[];
  rendu: Assignment[];
  assignDrag: Assignment;
  //injection service
  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private ngZone: NgZone) { }

  ngOnInit() {
    const iduser = localStorage.getItem('currentUser');
    const idToken = localStorage.getItem('currentToken');
    this.route.queryParams.subscribe(queryparams => {
      this.page = queryparams.page || 1;
      this.limit = queryparams.limit || 10;
      this.pageScr=1;
      this.limitScr =queryparams.limit || 3;
      this.getAssignments();
    })
    this.rendu = [];
    this.nonrendu = [];

  }
  ngAfterViewInit() {

    this.scroller
      .elementScrolled()
      .pipe(
        map((event) => {
          return this.scroller.measureScrollOffset("bottom");
        }),
        pairwise(),
        tap(([y1, y2]) => {
          if(y2 < y1) {
            console.log(y1 );
            console.log(y2);
            console.log("ON SCROLLE VERS LE BAS !");
          } else {
            console.log("ON SCROLLE VERS LE HAUT !");
          }
        }),
        filter(([y1, y2]) => y2 < y1 && y2 <200),
        throttleTime(200)
      )
      .subscribe((dist) => {
        this.ngZone.run(() => {
          if (this.hasNextPageScr) {
            this.pageScr = this.nextPageScr;
            this.getAssignmentsScroll();
          }else if (!this.hasNextPageScr&&this.pageScr==1){
            this.getAssignmentsScroll();
          }else{
            this.pageScr=1;
            this.getAssignmentsScroll();
          }
        });
      });
  }

  getAssignmentsScroll() {

      this.assignmentsService
        .getAssignmentsPagine(this.pageScr, this.limitScr)
        .subscribe((data) => {

          // au lieu de remplacer this.assignments par les nouveaux assignments récupérés
          // on va les ajouter à ceux déjà présents...
          this.assignmentsScroll = this.assignmentsScroll.concat(data.docs);
          // this.assignments = [...this.assignments, ...data.docs];
          this.limitScr = data.limit;
          this.pageScr = data.page;
          this.totalPagesScr = data.totalPages;
          this.hasNextPageScr = data.hasNextPage;
          this.hasPrevPageScr = data.hasPrevPage;
          this.nextPageScr = data.nextPage;
          this.prevPageScr = data.prevPage;
        });
  }

  assignmentClique(a) {
    this.assignmentSelect = a;
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.limit = data.limit;
        this.assignments = data.docs;
        if(this.assignmentsScroll.length==0){
          this.assignmentsScroll=data.docs;
        }
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.spinnershow = false;

        if(this.isAdmin()){
          this.assignments.forEach(assignment => {
            if (assignment.rendu) {
              this.rendu.push(assignment);
            } else {
              this.nonrendu.push(assignment);
            }
          })
        }else{
          this.assignments.forEach(assignment => {
            if (assignment.rendu) {
              this.rendu.push(assignment);
            } else {
              this.nonrendu.push(assignment);
            }
          })
        }
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
      isAdmin() {
    const isadmin = localStorage.getItem('isadmin');
    var isADMIN: boolean = false;
    if (isadmin === "false") return isADMIN;
    return true;

  }
}