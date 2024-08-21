import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonIcon, IonButtons, IonButton, IonInput } from '@ionic/angular/standalone';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.page.html',
  styleUrls: ['./form-add.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonButtons, IonIcon, IonToggle, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule,]
})
export class FormAddPage implements OnInit {

  tache: Tache = {} as Tache;
  formTask!: FormGroup;
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor( 
    private taskService: TaskService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router
  ) {  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadTacheById(+id);
    }

    this.formTask = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });

   }

   loadTacheById(id: number): void {
    this.taskService.getTacheById(id).subscribe(data => {
      this.tache = data; 
    }, error => {
      console.error('Erreur lors du chargement de des tâches :', error);
      this.errorMessage = 'Erreur lors du chargement de des tâches.';
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

  onSubmit() {
    if (this.formTask.valid) {
      const newTache: Tache = this.formTask.value;
      this.taskService.createTache(newTache).subscribe(
        response => {
          console.log('Tâche créé avec succès', response);
          this.successMessage = 'Tâche créé avec succès.';
          this.router.navigate(['/task']);
          setTimeout(() => this.successMessage = '', 2000);
        },
        error => {
          console.error('Erreur lors de la création de la tâche', error);
          this.successMessage = 'Erreur lors de la création de la tâche.';
          setTimeout(() => this.errorMessage = '', 2000);
        }
      );
    }
  }

}
