import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { AuthService } from './auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { endOfYear, format } from 'date-fns';

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
      .pipe(
        map((tasks) => {
          tasks = tasks.map((task) => {
            if (!task.due_date) {
              task.due_date = this.parseNullDate();
            }
            return task;
          });
          return tasks;
        }),
        catchError(this.handleError)
      );
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
      .patch<Task>(`${this.apiUrl}/tasks/${task.id}`, task, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number) {
    return this.http
      .delete<HttpResponse<void>>(`${this.apiUrl}/tasks/${id}`, {
        headers: this.getAuthHeaders(),
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Error): Observable<never> {
    return throwError(() => new Error(error.message));
  }

  private parseNullDate(): string {
    const lastDayOfYear = endOfYear(new Date());
    return format(lastDayOfYear, 'yyyy-MM-dd');
  }
}
