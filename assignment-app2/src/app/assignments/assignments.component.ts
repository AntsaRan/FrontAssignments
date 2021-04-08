import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

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
  //injection service
  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

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

     this.route.queryParams.subscribe(queryparams =>{
      this.page =queryparams.page || 1;
      this.limit =queryparams.limit || 10;
      this.getAssignments();
     })

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

  /*onAddAssignmentBtnClick() {
      this.formVisible = true;
    }  */
  /*onNouvelAssignement(event) {
    //this.assignments.push(event);
    this.assignmentsService.addAssignment(event)
    .subscribe(message =>{
      console.log(message);
      this.formVisible = false;
    })
  }*/
  /*onDeleteAssignment(a: Assignment) {
    this.assignmentsService.deleteAssignment(a)
    .subscribe(message =>{
      console.log(message);
      this.assignmentSelect=null;
    })
  }
*/
}