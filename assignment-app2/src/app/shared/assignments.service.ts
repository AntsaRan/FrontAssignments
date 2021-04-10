import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { bdInitialAssignments } from './data/data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[];
  constructor(private loggingservice:LoggingService,private http:HttpClient) { } 
  uri = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page:number,limit:number):Observable<any>{
    return this.http.get<Assignment[]>(this.uri+"?page="+page+"&limit="+limit);
  }
  peuplerBD() {
    let i =1;
    bdInitialAssignments.forEach(a => {
      
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateRendu = new Date(a.dateRendu);
      nouvelAssignment.rendu = a.rendu;
      console.log(i+" nouvelAssignment.dateRendu");
      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        //console.log(reponse.message);
        i++;
      })
    })
  }

  peuplerBDavecForkJoin():Observable<any> {
    const appelsversAddAssignment = [];

    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateRendu = new Date(a.dateRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsversAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsversAddAssignment);
  }
  
  
  getAssignment(id:number): Observable<Assignment> {
   /* console.log(id + "id serv")
    let assignmentSearch = this.assignments.find(a =>a.id===id);
    console.log(assignmentSearch.nom);
    return of(assignmentSearch);*/
    return this.http.get<Assignment>(this.uri+"/"+id)
    // pipe modifie la donnée reçu avant de la renvoyer
    .pipe(
      map(a => {
        return a;
      }),
      catchError(this.handleError<any>('### catchError: getAssignmentByID avec id='+id))
      );
      /*,
      filtrer les données avant de les envoyer
      filter(a => {
        return (a.rendu)
      })*/
    }

    
  private handleError<T>(operation: any, result?: T){
    return (error:any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué' + error.message);
      return of(result as T); 
    }
  }
  addAssignment(assignment:Assignment):Observable<any>{
    assignment.id=this.generateId();
  
    return this.http.post(this.uri,assignment);
  }

  generateId(): number {
  return Math.round(Math.random()*100000);  
  }

  updateAssignment(assignment:Assignment):Observable<any>{
    return this.http.put(this.uri,assignment);  
  }

  deleteAssignment(assignment:Assignment):Observable<any>{
    return this.http.delete(this.uri+"/"+assignment._id);
  }
}
 