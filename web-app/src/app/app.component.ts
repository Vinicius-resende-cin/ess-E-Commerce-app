import { Component } from '@angular/core';
import * as Names from './common/global-names';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = Names.appTitle;
}
