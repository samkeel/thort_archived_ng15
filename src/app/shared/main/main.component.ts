import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private responsive: BreakpointObserver) {}

  handset = true;
  currentScreenSize: string = '';

  ngOnInit(): void {
    this.responsive
      .observe([
        Breakpoints.Small,
        Breakpoints.Large,
        Breakpoints.HandsetPortrait,
      ])
      .subscribe((result) => {
        this.handset = false;
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.Small]) {
          this.currentScreenSize = 'Small';
        } else if (breakpoints[Breakpoints.Large]) {
          this.currentScreenSize = 'Large';
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.handset = true;
          this.currentScreenSize = 'Handset Portrait';
        }
      });
  }
}
