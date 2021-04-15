import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {



  assignments: Assignment[];
  constructor(private loggingservice:LoggingService,private http:HttpClient) { } 
  uri = "https://api-assingments.herokuapp.com/api/assignments";
    //uri=" http://localhost:8010/api/assignments";

  getAssignmentbyname(page:number,limit:number,searchval: string):Observable<any> {
   // return this.http.get<Assignment>(this.uri+"/search/"+searchval);
   console.log("searchval "+ searchval);
    return this.http.get<Assignment[]>(this.uri+"/search?page="+page+"&limit="+limit+"&search="+searchval);
 }
  getAssignments():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.uri);
  }
  getAssignmentsSimple():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.uri+"/np");
  }
  getAssignmentsPagine(page:number,limit:number):Observable<any>{
    return this.http.get<Assignment[]>(this.uri+"?page="+page+"&limit="+limit);
  }
 
  getAssignment(id:number): Observable<Assignment> {
    console.log(id + " id serv");
    return this.http.get<Assignment>(this.uri+"/"+id)
    .pipe(
      map(a => {
        console.log(a.nom+ " SERVICE A NOM");
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
    console.log(assignment._id + " ID update");
    return this.http.put(this.uri,assignment);  
  }

  deleteAssignment(assignment:Assignment):Observable<any>{
    console.log(assignment._id+" ID DELETE");
    return this.http.delete(this.uri+'/'+assignment._id);
  }
  /* peuplerBD() {
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
  
  */
}
 