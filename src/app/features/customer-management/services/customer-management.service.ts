import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Customer managementService {
  // Replace this base URL with the endpoint agreed for this service.
  private readonly baseUrl = '/api/REPLACE_WITH_ENDPOINT';

  constructor(private readonly http: HttpClient) {}

  // Add typed API methods here after agreeing the request/response contracts.
  // Example:
  // getAll(): Observable<unknown[]> {
  //   return this.http.get<unknown[]>(this.baseUrl);
  // }
}
