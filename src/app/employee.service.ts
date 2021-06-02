import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';
import {Departement} from './Departement';

@Injectable({providedIn: 'root'})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee , departementId: number ): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add/${departementId}`, employee);
  }


  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
  public getEmployeeId(employeeId: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/find/${employeeId}`);
  }
  public getDepartementId(departementId: number): Observable<Departement>{
    return this.http.get<Departement>(`${this.apiServerUrl}/departement/find/${departementId}`);
  }
  public getDepartement(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.apiServerUrl}/departement/all`);
  }
}
