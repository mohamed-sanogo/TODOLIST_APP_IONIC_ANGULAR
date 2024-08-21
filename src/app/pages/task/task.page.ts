import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonBadge, IonSegment, IonLabel, IonSegmentButton, IonButton, AlertController } from '@ionic/angular/standalone'; 
import { Tache } from 'src/app/model/tache';
import { TaskService } from 'src/app/services/task.service';  
import { PopoverPage } from '../popover/popover.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [IonButton, IonSegmentButton, IonLabel, IonSegment, IonBadge, IonIcon, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [PopoverController]
})
export class TaskPage implements OnInit {

  taches: Tache[] = [];
  filter: string = 'EnCours'; 

  constructor(public popoverController: PopoverController, private taskService: TaskService, private navCtrl: NavController, private alertController: AlertController,) { } 

  ngOnInit() { 
    this.loadTasks(); 
  }

  loadTasks() {
    this.taskService.getTaches().subscribe(
      (tasks: Tache[]) => this.applyFilter(tasks),
      error => {
        console.error('Erreur lors du chargement des tâches', error);
      }
    );
  }

  applyFilter(tasks: Tache[]) {
    if (this.filter === 'liste') {
      this.taches = tasks;
    } else if (this.filter === 'EnCours') {
      this.taches = tasks.filter(task => !task.completed);
    } else if (this.filter === 'terminer') {
      this.taches = tasks.filter(task => task.completed);
    }
  }

  onFilterChange(event: any) {
    this.filter = event.detail.value;
    this.loadTasks();
  }

  completeTache(tache: Tache) {
    this.taskService.tacheCompleted(tache.id).subscribe((updatedTache: Tache) => {
      tache.completed = updatedTache.completed;
      tache.updateDay = updatedTache.updateDay;
      this.reloadPage();
    });
  }

  
  async confirmDelete(tache : Tache) {
    const alert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Voulez-vous vraiment supprimer cette tâche ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.taskService.deleteTache(tache.id).subscribe(() => { 
              this.close();
              this.reloadPage();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  close(){
    this.popoverController.dismiss();
  }

  async presentPopover(ev: any, tache: Tache) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      componentProps: {
        tache: tache
      },
      mode: 'ios',
      translucent: true
    });
    await popover.present();
  }

  navigateToFormAddPage() {
    this.navCtrl.navigateForward('/form-add');
  }

  reloadPage() { 
    location.reload();
  }
}
