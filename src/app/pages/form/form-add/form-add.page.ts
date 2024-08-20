import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.page.html',
  styleUrls: ['./form-add.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonIcon, IonToggle, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule,]
})
export class FormAddPage implements OnInit {

  taskForm: FormGroup;
  taskId: number | null = null;

  ngOnInit() { }

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService, 
    @Inject('taskId') taskId: number | null
  ) {
    this.taskId = taskId;
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false]
    });

    if (this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number) {
    this.taskService.getTacheById(id).subscribe(task => { 
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      if (this.taskId) {
        this.taskService.updateTache(this.taskId, formValue).subscribe(() => { 
        });
      } else {
        this.taskService.createTache(formValue).subscribe(() => { 
        });
      }
    }
  } 
}
