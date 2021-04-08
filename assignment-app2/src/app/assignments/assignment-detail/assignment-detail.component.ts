import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  @Output() assignDeleteEmit = new EventEmitter<Assignment>();
  assignmentTransmis: Assignment;

  constructor(private assignmentService: AssignmentsService,
    private route: ActivatedRoute, 
    private router: Router,
    private authservice:AuthService) { }

  ngOnInit(): void {
    this.getAssignementById();
  }

  getAssignementById() {
    const id: number = + this.route.snapshot.params.id;
    console.log(id + " id")
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => {
        console.log(assignment.nom + " nom");
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
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message+ " MESSAGE");
        this.assignmentTransmis = null;
        this.router.navigate(["/home"]);
      })
    //  this.assignDeleteEmit.emit(this.assignmentTransmis);  
  }

  onclickEdit(){
    this.router.navigate(["/assignment",this.assignmentTransmis.id,"edit"],
    {
      queryParams:{
        nom:'Antsa',
        metier:'Dév',
      },
      fragment:"edition"
    });
  }

  isAdmin(){
     return this.authservice.admin;
  }

}
