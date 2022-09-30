import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup = new FormGroup({

    password: new FormControl(""),

    username: new FormControl(""),
  });
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.getRandomNumber().subscribe((number : any)=> {
      this.userForm.patchValue({
        random:number[0]
      })
      this.authService.login(this.userForm.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/')
      }, error => {
        console.log(error);
      })
    })
  
  }

}
