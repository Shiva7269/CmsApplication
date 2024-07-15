// pages.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private apiUrl =environment.apiUrl;
private baseUrl=environment.baseUrl
  constructor(private http: HttpClient) {}

  createPage(pageData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pageData);
  }

  getPages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPageIdByUrl(pageUrl: string): Observable<any> {
    const urlParts = pageUrl.split('/');
    const pageUrlPart = urlParts[urlParts.length - 1];
    const url = `${this.baseUrl}/${pageUrlPart}`;

    return this.http.get<any>(url).pipe(
      map(response => {
      //  console.log(response);
        if (Array.isArray(response)) {
          // If the response is an array, return the id of the first element
          return response[0]?._id; 
        } else {
          // If the response is an object, return the id property directly
          return response._id;
        }
      }),
      catchError(error => {
        console.error('Error fetching page ID:', error);
        return throwError(error);
      })
    );
  }

  
  
  
updatePageComponents(id: string, components: any[] = []): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  //console.log(components);
  return this.http.patch<any>(url, { components });
}
  getPage(id: any): Observable<any> {
    const pageId = typeof id === 'object' ? id._id : id;
    const url = `${this.apiUrl}/${pageId}`;

    //console.log('Fetching page details from:', url); // Log the URL being requested
    return this.http.get<any>(url).pipe(
      tap(response => console.log('Page details response:', response)), // Log the response received
      catchError(error => {
        console.error('Error fetching page details:', error); // Log any errors that occur
        return throwError(error);
      })
    );
  }
 
  getPageComponents(pageUrl: string): Observable<any[]> {
    const url = `${this.baseUrl}/${pageUrl}`;
    return this.http.get<any[]>(url).pipe(
      tap(data => console.log('Data received from API:', data)),
      catchError(error => {
        console.error('Error fetching page components:', error);
        return throwError(error);
      })
    );
  }

  deletePage(pageId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${pageId}`);
  }
 
}
