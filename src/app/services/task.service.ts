import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Tache } from '../model/tache';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private mesAPI = 'http://localhost:8080/api/tache';

  constructor(private http: HttpClient) { }

  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.mesAPI);
  }
  
  getTacheById(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.mesAPI}/${id}`);
  }
  
  createTache(task: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.mesAPI, task);
  }

  updateTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.mesAPI}/${tache.id}`, tache);
  }
  
  tacheCompleted(id: number): Observable<Tache> {
    return this.http.put<Tache>(`${this.mesAPI}/completed/${id}`, {});
  }

  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.mesAPI}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Erreur ${error.status}: ${error.error}`;
    }

    return throwError(errorMessage);
  }
}
