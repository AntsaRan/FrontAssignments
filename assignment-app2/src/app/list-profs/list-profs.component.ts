import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfService} from '../shared/prof.service';
import { Prof } from '../shared/model/prof.model';
@Component({
  selector: 'app-list-profs',
  templateUrl: './list-profs.component.html',
  styleUrls: ['./list-profs.component.css']
})
export class ListProfsComponent implements OnInit {
  profs: Prof[];
  spinnershow = true;
  page: number = 1;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  pageSizeOptions: number[] = [5, 10, 25];
  limit: number;
  imageUrl: string = "../../assets/img/";

  constructor(private profserv: ProfService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryparams =>{
      this.page =queryparams.page || 1;
      this.limit =queryparams.limit || 10;
      this.getProfs();
         })

  }
  getProfs() {
    this.profserv.getProfsPagine(this.page, this.limit)
      .subscribe(data => {
        this.limit = data.limit;
        this.profs = data.docs;
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
    /*  this.page = this.prevPage;
      this.getAssignments();*/
      this.router.navigate(["/listEleve"],
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
      this.router.navigate(["/listEleve"],
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
      this.router.navigate(["/listEleve"],
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
      this.router.navigate(["/listEleve"],
      {
        queryParams: {
          page: this.totalPages,
          limit: this.limit,
        },
      });
    }
}
