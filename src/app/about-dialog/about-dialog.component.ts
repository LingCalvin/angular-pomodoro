import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent {
  version = environment.VERSION ? environment.VERSION : 'NONRELEASE';
}
