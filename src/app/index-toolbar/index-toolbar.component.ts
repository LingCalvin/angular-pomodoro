import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutDialogueComponent } from '../about-dialogue/about-dialogue.component';

@Component({
  selector: 'app-index-toolbar',
  templateUrl: './index-toolbar.component.html',
  styleUrls: ['./index-toolbar.component.css']
})
export class IndexToolbarComponent {

  constructor(private dialog: MatDialog) { }

  showAboutDialog(): void {
    this.dialog.open(AboutDialogueComponent);
  }

}
