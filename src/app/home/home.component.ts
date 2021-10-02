import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from '../core/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute
  ) {
    this.headerService.setHeader(this.route.snapshot.data.title);
  }
}
