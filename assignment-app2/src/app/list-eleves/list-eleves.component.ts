import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { ElevesService } from '../shared/eleves.service';
import { Eleve } from '../shared/model/eleve.model';


@Component({
  selector: 'app-list-eleves',
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.css']
})
export class ListElevesComponent implements OnInit {
  eleves: Eleve[];
  spinnershow = true;
  page: number = 1;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  pageSizeOptions: number[] = [5, 10, 25];
  limit: number;
  constructor(private eleveservice: ElevesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryparams =>{
      this.page =queryparams.page || 1;
      this.limit =queryparams.limit || 10;
      this.getEleves();
         })

  }
  getEleves() {
    this.eleveservice.getEleves()
      .subscribe(data => {
        this.eleves = data;
        this.spinnershow = false;
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
}
