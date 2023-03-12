import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }
  public login() {
    (this.loginForm.value.username, this.loginForm.value.password)
    if (this.loginForm.value.username == "admin" && this.loginForm.value.password == "admin") {
      this.loginForm.reset();
      this.router.navigate(["employee-dashboard"])
    } else {
      alert("Invalid username or password.");
    }
  };
}
