import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShapeService {


  // capitals = '/assets/data/Europe.geo.json';

  constructor(private http: HttpClient) {
  }

  getStateShapes(): any {
    return this.http.get('/assets/data/Europe.geo.json');
  }
}
