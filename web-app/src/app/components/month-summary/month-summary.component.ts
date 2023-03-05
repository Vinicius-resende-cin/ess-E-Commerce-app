import { Component } from '@angular/core';

@Component({
  selector: 'app-month-summary',
  templateUrl: './month-summary.component.html',
  styleUrls: ['./month-summary.component.scss'],
})
export class MonthSummaryComponent {
  filter: {} = {};

  searchRange() {
    const startInput = document.querySelector(
      'input#start-month'
    )! as HTMLInputElement;
    const endInput = document.querySelector(
      'input#end-month'
    )! as HTMLInputElement;

    this.filter = {
      start:
        startInput.value == '' ? '' : new Date(startInput.value).toISOString(),
      end: endInput.value == '' ? '' : new Date(endInput.value).toISOString(),
    };
  }
}
