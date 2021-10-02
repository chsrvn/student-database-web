import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IClassVo } from '../../../model/IClassVo';
import { IStudentVo } from '../../../model/IStudentVo';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  @Input() classList: IClassVo[];
  @Input() student: IStudentVo;
  @Input() classId: string;
  @Input() isUpdate: boolean;

  studentGroup: FormGroup;

  constructor(public modalController: ModalController) {}

  ngOnInit(): void {
    this.studentGroup = new FormGroup({
      firstName: new FormControl(this.student.firstName, Validators.required),
      lastName: new FormControl(this.student.lastName, Validators.required),
      emailId: new FormControl(this.student.emailId),
      rollNo: new FormControl(this.student.rollNo),
      classId: new FormControl({
        value: this.student.classId,
        disabled: this.classId,
      }),
    });
  }

  onCreateHandler() {
    if (!this.studentGroup.invalid) {
      return this.modalController.dismiss(this.studentGroup.getRawValue());
    }
  }
}
