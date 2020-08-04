import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  license$: Observable<string>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLicense();
  }

  getLicense(): void {
    this.license$
      = this.http.get('./assets/LICENSE.txt', { responseType: 'text' });
  }

}
