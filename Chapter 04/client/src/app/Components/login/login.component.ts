import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass:any;
  message:any;
  processing=false;
  form: FormGroup;
  successMsg: boolean;
  errorMsg: any;
  serverErrors: boolean;
  errorMessage: string;
  

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private cookieService:CookieService, private router: Router) { 
    this.createForm();
    
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();

  }

  onLoginSubmit(){
    this.processing=true;
    this.disableForm();
    const user = {
      auth_email: this.form.get('email')?.value,
      auth_password: this.form.get('password')?.value
    }
    this.authService.signinUser(user).subscribe(data=>{
      this.successMsg=true;
      this.messageClass='alert alert-success';
      this.message = 'Login successful';
      console.log('data',data);
      //this.authService.storeUserData
    setTimeout(()=>this.successMsg=false,4000)
    this.router.navigate(['/dashboard']);    
    this.errorMsg=data;
        //this.authService.storeUserData(data.token,data.user)   
    console.log('in authservice',data);
    return this.errorMsg;
  },err=> {
    this.messageClass='alert alert-danger';
    this.message = err.error.errors[0].message;
    console.log('error caught',err.error.errors[0].message);
    this.errorMessage=err;
    this.serverErrors = true;
    setTimeout(()=>this.serverErrors=false,4000)
    console.log('server errors: ',this.errorMessage);
    return this.errorMessage;
    })
  }

  ngOnInit(): void {
  }

}
