import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonIcon, AlertController } from '@ionic/angular/standalone';
import { PopoverController, NavController } from '@ionic/angular'; 
import { Tache } from 'src/app/model/tache';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
  standalone: true,
  imports: [IonIcon, IonToggle, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PopoverPage implements OnInit {

  @Input() tache!: Tache; 
  toggleComplete: boolean = false;

  constructor(public popoveController : PopoverController,
    private taskService: TaskService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.toggleComplete = this.tache.completed;
  }

  close(){
    this.popoveController.dismiss();
  }

  navigateToFormEdit() {
    this.navCtrl.navigateForward(`/form-add/${this.tache.id}`);
    this.close();
  }

  async confirmDelete() {
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
            this.taskService.deleteTache(this.tache.id).subscribe(() => { 
              this.close();
              this.reloadPage();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmComplete() {
    if (this.toggleComplete) {
      const alert = await this.alertController.create({
        header: 'Confirmer la complétion',
        message: 'Marquer cette tâche comme terminée ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.toggleComplete = false;
            }
          },
          {
            text: 'Valider',
            handler: () => {
              this.taskService.tacheCompleted(this.tache.id).subscribe(() => { 
                this.close();
                this.reloadPage();
              });
            }
          }
        ]
      });

      await alert.present();
    }
  }

  toggleChange() {
    if (this.toggleComplete) {
      this.confirmComplete();
    }
  }

  reloadPage() {  
      window.location.reload(); 
  }

}
