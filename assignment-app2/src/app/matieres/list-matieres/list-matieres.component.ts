import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatieresService } from '../../shared/matieres.service';
import { Matiere } from '../../shared/model/matiere.model';
@Component({
  selector: 'app-list-matieres',
  templateUrl: './list-matieres.component.html',
  styleUrls: ['./list-matieres.component.css']
})
export class ListMatieresComponent implements OnInit {
  matieres: Matiere[];
  spinnershow = true;
  page: number = 1;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  pageSizeOptions: number[] = [5, 10, 25];
  limit: number;
  constructor(private matiereservice: MatieresService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getMatieres();
  }
  getMatieres() {
    this.matiereservice.getMatieres()
      .subscribe(data => {
        this.matieres = data;
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
