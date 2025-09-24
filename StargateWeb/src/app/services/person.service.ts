import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// API Response interfaces based on your backend structure
export interface BaseResponse<T = any> {
  success: boolean;
  message: string;
  responseCode: number;
  data?: T;
}

export interface PersonDto {
  id: number;
  fullName: string;
  rank?: string;
  dutyTitle?: string;
  careerStartDate?: string;
  careerEndDate?: string;
  // Add other properties that your API returns
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly apiUrl = `https://localhost:7204/Person`;

  constructor(private http: HttpClient) { }

  getPeople(): Observable<PersonDto[]> {
    return this.http.get<BaseResponse<PersonDto[]>>(this.apiUrl).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch people');
      })
    );
  }

  getPersonByName(name: string): Observable<PersonDto> {
    return this.http.get<BaseResponse<PersonDto>>(`${this.apiUrl}/${name}`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to fetch person');
      })
    );
  }

  createPerson(name: string): Observable<PersonDto> {
    return this.http.post<BaseResponse<PersonDto>>(this.apiUrl, `"${name}"`, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Failed to create person');
      })
    );
  }
}
