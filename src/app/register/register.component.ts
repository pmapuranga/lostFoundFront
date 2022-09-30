import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    password: new FormControl(""),
    role: new FormControl("Client"),
    username: new FormControl(""),
  });
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.getRandomNumber().subscribe((number : any)=> {
      this.userForm.patchValue({
        random:number[0]
      })
      this.authService.register(this.userForm.value).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/login')
      }, error => {
        console.log(error);
      })
    })
  
  }

}
