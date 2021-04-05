import { Component, OnInit } from '@angular/core';
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
  assignments:Assignment[];
  spinnershow=true;
  nodata=false;
  //injection service
  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit() {
    console.log('AVANT AFFICHAGE');
    /*
    setTimeout(() => {
      this.ajoutActive = true;
    }, 3000);
    */
   //Service pour afficher liste assignments
   this.assignmentsService.getAssignments()
   .subscribe(assignments => {
     this.assignments = assignments;
     this.spinnershow=false;
     console.log("données reçues");
   }); 

   if (this.assignments.length==0){
     this.nodata=true;
   }
  }


  assignmentClique(a) {
    this.assignmentSelect = a;
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