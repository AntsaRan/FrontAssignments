import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Matiere } from './model/matiere.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  matieres: Matiere[];
  constructor(private http:HttpClient) { }
  uri = "  https://api-assingments.herokuapp.com/api/matiere";

  getMatieres():Observable<Matiere[]>{
    return this.http.get<Matiere[]>(this.uri);
  }
  getMatiere(id:number): Observable<Matiere> {
    console.log(id + " Id dans MatiereService");
    return this.http.get<Matiere>(this.uri+"/"+id)
    .pipe(
      map(a => {
        console.log(a._id+ " ___id");
        return a;
      }),
      catchError(this.handleError<any>('### catchError: getMatiereById avec id= '+id))
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

}
