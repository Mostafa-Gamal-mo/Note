import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient: HttpClient) { }

  addNote(formData: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'addNote', formData)
  }
  updateNote(formData: object): Observable<any> {
    return this._HttpClient.put(environment.baseUrl + 'updateNote', formData)
  }
  getNote(formData: object): Observable<any> {
    return this._HttpClient.post(environment.baseUrl + 'getUserNotes', formData)
  }
  deleteNote(formData: object): Observable<any> {
    const model = {
      body: formData
    }
    return this._HttpClient.delete(environment.baseUrl + 'deleteNote', model)
  }



}
