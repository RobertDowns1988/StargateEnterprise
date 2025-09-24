import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// define model interface if you have one
export interface Person {
  fullName: string;
  currentRank: string;
  dutyTitle: string;
  careerStartDate: string;
  careerEndDate: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'https://localhost:5204/Person'; // your API root

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  getPersonByName(name: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}/${name}`);
  }

  createPerson(name: string): Observable<any> {
    return this.http.post(this.baseUrl, name);
  }
}
