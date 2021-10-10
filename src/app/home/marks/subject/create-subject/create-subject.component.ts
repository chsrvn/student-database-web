import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IClassVo } from '../../../../model/IClassVo';
import { ISubjectVo } from '../../../../model/ISubjectVo';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
})
export class CreateSubjectComponent implements OnInit {
  @Input() classList: IClassVo[];
  @Input() subject: ISubjectVo;
  @Input() classId: string;
  @Input() isUpdate: boolean;

  subjectNameControl: FormControl;

  constructor(public modalController: ModalController) {}

  ngOnInit(): void {
    this.subjectNameControl = new FormControl(
      this.subject.name,
      Validators.required
    );
  }

  onCreateHandler() {
    if (!this.subjectNameControl.invalid) {
      this.subject = { ...this.subject, name: this.subjectNameControl.value };
      return this.modalController.dismiss(this.subject);
    }
  }
}
