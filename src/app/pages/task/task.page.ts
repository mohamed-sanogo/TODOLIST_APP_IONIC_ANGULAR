import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonBadge, IonSegment, IonLabel, IonSegmentButton } from '@ionic/angular/standalone'; 
import { Tache } from 'src/app/model/tache';
import { TaskService } from 'src/app/services/task.service'; 
import { FormAddPage } from '../form/form-add/form-add.page';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [IonSegmentButton, IonLabel, IonSegment, IonBadge, IonIcon, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [PopoverController]
})
export class TaskPage implements OnInit {

  taches: Tache[] = []; 

  constructor(public popoverController: PopoverController, private taskService: TaskService) { } 

  ngOnInit() {
    this.taskService.getTaches().subscribe((data: Tache[]) => {
      this.taches = data;
    });
  }

  completeTache(tache: Tache) {
    this.taskService.tacheCompleted(tache.id).subscribe((updatedTache: Tache) => {
      tache.completed = updatedTache.completed;
      tache.updateDay = updatedTache.updateDay;
    });
  }

  async presentPopover(ev: any){
    const popover = await this.popoverController.create({
      component : PopoverPage,
      event : ev,
      mode : 'ios',
      translucent : true
    });
    await popover.present();
  }

}
