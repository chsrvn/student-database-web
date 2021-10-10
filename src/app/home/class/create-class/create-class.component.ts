import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss'],
})
export class CreateClassComponent implements OnInit {
  classNameControl: FormControl;

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.classNameControl = new FormControl('');
  }

  onCreateHandler() {
    if (!!this.classNameControl.value) {
      return this.modalController.dismiss(this.classNameControl.value);
    }
  }
}
