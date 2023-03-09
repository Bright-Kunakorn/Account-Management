import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {path: '',redirectTo : 'login', pathMatch:'full'},
  {path: 'login',component:LoginComponent},
  {path: 'home',component:HomeComponent},
  {path: 'employee-dashboard',component:EmployeeDashboardComponent},
  {path: 'add-employee',component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            ReactiveFormsModule,
            FormsModule],
  exports: [RouterModule,
            FormsModule,
            ReactiveFormsModule
]
})
export class AppRoutingModule { }
