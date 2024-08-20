import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonIcon } from '@ionic/angular/standalone';
import { PopoverController } from '@ionic/angular'; 

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
  standalone: true,
  imports: [IonIcon, IonToggle, IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PopoverPage implements OnInit {

  constructor(public popoveController : PopoverController) { }

  ngOnInit() {
  }

  close(){
    this.popoveController.dismiss();
  }

}
