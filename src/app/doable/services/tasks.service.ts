import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    if (!token) return {};
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  listTasks() {
    return this.http
      .get<Task[]>(`${this.apiUrl}/tasks`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  createTask(task: Partial<Task>) {
    return this.http
      .post<Task>(`${this.apiUrl}/tasks`, task, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  updateTask(task: Partial<Task>) {
    return this.http
      .put<Task>(`${this.apiUrl}/tasks/${task.id}`, task, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number) {
    return this.http
      .delete<Task>(`${this.apiUrl}/tasks/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.message));
  }
}
