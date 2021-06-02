import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Departement} from './Departement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[];
  public departements : Departement[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  employee: Employee;
  departementId : number;
  id : number;
  deb : number;
  dep : Departement;

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
    this.getdepartements();
    this.getEmployeeById(39);
    console.log(this.employee)
    //this.getDepartementId(this.departementId);
  }

  public getDepartementId( number){
   this.employeeService.getDepartementId(number).subscribe(
     (response: Departement) => {
       this.dep = response;
       console.log(this.dep);
     });
  }


  public getEmployeeById( number){
    this.employeeService.getEmployeeId(number).subscribe(
      (response: Employee) => {
       // this.dep = response;
        console.log(response.departement);
      });
  }

  public getdepartements(): void {
    this.employeeService.getDepartement().subscribe(
      (response: Departement[]) => {
        this.departements = response;
        console.log(this.departements);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        //this.getDepartementId(this.employee)
        this.employees.forEach(res => {
          console.log(res.departement)
        })
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();//id of button
    this.deb=addForm.value.departementId;
    //console.log(this.deb);
    this.employeeService.addEmployee(addForm.value, this.deb).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();//restaure les valeurs par défaut des éléments du formulaire.
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();// vider le form
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onDeleteEmployee(employeeId: number){
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }



}
