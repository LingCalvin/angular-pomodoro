import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-third-party-licenses',
  templateUrl: './third-party-licenses.component.html',
  styleUrls: ['./third-party-licenses.component.css']
})
export class ThirdPartyLicensesComponent implements OnInit {

  licenses$: Observable<string>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLicenses();
  }

  getLicenses(): void {
    this.licenses$
      = this.http.get('./3rdpartylicenses.txt', { responseType: 'text' });
  }
}
