import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Eleve } from './model/eleve.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({

  providedIn: 'root'
})
export class ElevesService {
  

  eleves: Eleve[];
  constructor(private http: HttpClient) { }
  uri = "  https://api-assingments.herokuapp.com/api/eleve";
  uriSimple = "  https://api-assingments.herokuapp.com/api/eleveList";

  addEleve(nouvelEleve: Eleve) {
    nouvelEleve.id = this.generateId();
    return this.http.post(this.uri, nouvelEleve);
  } 

  deleteEleve(elevetransmis:Eleve):Observable<any>{
    return this.http.delete(this.uri+'/'+elevetransmis._id);
  }
  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.uriSimple);
  }
  getElevesPagine(page: number, limit: number): Observable<any> {
    return this.http.get<Eleve[]>(this.uri + "?page=" + page + "&limit=" + limit);
  }
  generateId(): number {
    return Math.round(Math.random() * 100000);
  }
  getEleveById(id: number): Observable<Eleve> {
    console.log(id + "id serv");
    return this.http.get<Eleve>(this.uri + "/" + id)
      .pipe(
        map(a => {
          return a;
        }),
        catchError(this.handleError<any>('### catchError: getAssignmentByID avec id=' + id))
      );
      /*,
      filtrer les données avant de les envoyer
      filter(a => {
        return (a.rendu)
      })*/  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué' + error.message);
      return of(result as T);
    }
  }
  updateEleve(eleve: Eleve) {
    console.log(eleve._id + " ID update");
    return this.http.put(this.uri,eleve);    }
}
