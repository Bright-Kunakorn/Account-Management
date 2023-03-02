import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  private password = 123
  public loginForm!: FormGroup
  constructor(
    public dialogRef: MatDialogRef<AuthenticationComponent>,
    public dialog: MatDialog,
    private formBuilder : FormBuilder, private http: HttpClient, private router : Router){}

  ngOnInit(): void {  
    this.loginForm  = this.formBuilder.group({
      username : [''],
      password : ['']
    }) 
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
  
  onPasswordSubmit(): void{
    (this.loginForm.value.password)
      if (this.loginForm.value.password == "admin") {
        alert("successful!");
        this.loginForm.reset();
        this.dialog.closeAll();
      } else {
        alert("Invalid password.");
      }
    };
  }