import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
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
  search: string;


  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const iduser = localStorage.getItem('currentUser');
    const idToken = localStorage.getItem('currentToken');

    this.route.queryParams.subscribe(queryparams => {
      this.page = queryparams.page || 1;
      this.limit = queryparams.limit || 10;
      this.search =queryparams.search;
      this.getAssignments();
    })
  }


  getAssignments() {
    console.log("getAssignments search " + this.search);

    this.assignmentsService.getAssignmentbyname(this.page, this.limit,this.search)
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

      });
  }

  Prev() {

    this.router.navigate(["/search"],
      {
        queryParams: {
          page: this.prevPage,
          limit: this.limit,
          search:this.search,
        },
      });

  }

  Next() {

    this.router.navigate(["/search"],
      {
        queryParams: {
          page: this.nextPage,
          limit: this.limit,
          search:this.search,
        },
      });
  }
  FirstP() {

    this.router.navigate(["/search"],
      {
        queryParams: {
          page: 1,
          limit: this.limit,
          search:this.search,
        },
      });
  }
  LastP() {

    this.router.navigate(["/search"],
      {
        queryParams: {
          page: this.totalPages,
          limit: this.limit,
          search:this.search,
        },
      });
  }
}

