import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../model/tache';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private mesAPI = 'http://localhost:8080/api/tache';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les tâches
  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.mesAPI);
  }

  // Récupérer une tâche par son ID
  getTacheById(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.mesAPI}/${id}`);
  }

  // Créer une nouvelle tâche
  createTache(task: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.mesAPI, task);
  }

  // Mettre à jour une tâche existante
  updateTache(id: number, task: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.mesAPI}/${id}`, task);
  }

  // Marquer une tâche comme complétée
  tacheCompleted(id: number): Observable<Tache> {
    return this.http.put<Tache>(`${this.mesAPI}/completed/${id}`, {});
  }

  // Supprimer une tâche
  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.mesAPI}/${id}`);
  }
}
