import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals = '/assets/data/Europe.geo.json';

  constructor(private http: HttpClient) { }
}
