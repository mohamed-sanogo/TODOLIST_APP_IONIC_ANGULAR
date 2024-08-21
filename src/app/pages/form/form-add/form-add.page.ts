import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonIcon, IonButtons, IonButton, IonInput, IonBackButton, IonToast } from '@ionic/angular/standalone';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.page.html',
  styleUrls: ['./form-add.page.scss'],
  standalone: true,
  imports: [IonToast, IonBackButton, IonInput, IonButton, IonButtons, IonIcon, IonToggle, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule,]
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
      title: [this.tache?.title || '', [Validators.required, Validators.maxLength(20)]],
      description: [this.tache?.description || '', [Validators.maxLength(20)]]
    });

   }

   loadTacheById(id: number): void {
    this.taskService.getTacheById(id).subscribe(data => {
      this.tache = data; 
      this.formTask.patchValue({
        title: this.tache.title,
        description: this.tache.description
      });
    }, error => { 
      this.errorMessage = 'Erreur lors du chargement de la tâche.';
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

  onSubmit() {
    if (this.formTask.valid) {
      const sendTache: Tache = {
        ...this.tache,
        ...this.formTask.value
      };

      if (this.isEditMode) {
        this.taskService.updateTache(sendTache).subscribe(
          response => { 
            this.successMessage = 'Tâche mise à jour avec succès.';
            setTimeout(() => this.successMessage = '', 2000);
            this.reloadPage();
          },
          error => {
            this.errorMessage = "Ce titre existe deja";
            setTimeout(() => this.errorMessage = '', 2000);
          }
        );
      } else {
        this.taskService.createTache(sendTache).subscribe(
          response => { 
            this.successMessage = 'Tâche créée avec succès.';
            setTimeout(() => this.successMessage = '', 2000);
            this.reloadPage();
          },
          error => {
            this.errorMessage = "Ce titre existe deja";
            setTimeout(() => this.errorMessage = '', 2000);
          }
        );
      }
    }
  }

  reloadPage() { 
    this.router.navigate(['/task']).then(() => {
      window.location.reload();
    });
  }

}
