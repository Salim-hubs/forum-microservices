import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = input.required<string>();
  logged = input.required<boolean>();
  button = input<boolean>(false);

  constructor(
    private router: Router
  ) { }

  goToProfile() {
    this.router.navigate(["profile"]);
  }

  goToTopics() {
    this.router.navigate(["topics"]);
  }
}
