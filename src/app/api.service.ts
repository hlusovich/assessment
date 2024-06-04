import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface ApiParams {
  filter?: string | string[]
  sort?: string
}

export interface WriteResult {
  created?: number
  deleted?: number
  modified?: number
}

export function createParams(apiParams: ApiParams = {}): HttpParams {
  return Object.entries(apiParams).reduce((params, [key, value]) => {
    for (const val of Array.isArray(value) ? value : [value]) {
      params = params.append(key, String(val));
    }
    return params;
  }, new HttpParams());
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly users = {
    query: (params: ApiParams = {}) => this.get<User[]>('/api/users', params),
    get: (userId: string) => this.get<User>(`/api/users/${userId}`),
    put: (userId: string, body: Partial<User>) => this.put<WriteResult>(`/api/users/${userId}`, body),
    post: (body: Partial<User>) => this.post<Partial<User>>('/api/users', body),
    delete: (userId: string) => this.delete<WriteResult>(`/api/users/${userId}`),
  }

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: ApiParams): Observable<T> {
    return this.http.get<T>(url, { params: createParams(params) });
  }

  put<T>(url: string, body?: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  post<T>(url: string, body?: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
