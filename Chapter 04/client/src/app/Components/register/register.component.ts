import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import User from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  successMsg: boolean;
  errorMsg: any;
  serverErrors: boolean;
  errorMessage: string;
  form: FormGroup;
  formOptions: AbstractControlOptions = {}
  constructor(
    private formBuilder: FormBuilder,private authService: AuthService
  ) { 
    this.createForm()
  }
  
  createForm(){
    this.form = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(30),this.validateEmail])],
      username: ['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15),this.validateUsername])],
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],
      confirm: ['',Validators.required]
    },{validator: this.matchingPasswords('password','confirm')} as AbstractControlOptions)
  }

  validateEmail(controls:any){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if (regExp.test(controls.value)){
      return null;

    } else {
      return {'validateEmail':true}
    }

  }

  validateUsername(controls:any){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    
    if (regExp.test(controls.value)){
      return null;

    } else {
      return {'validateUsername':true}
    }

  }

  validatePassword(controls: any) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  matchingPasswords(password: any,confirm: any){
    return (group: FormGroup)=>{
      if (group.controls[password].value === group.controls[confirm].value){
        return null;
      } else {
        return {'matchingPasswords':true}
      }
    }
  }
  onRegisterSubmit() {
    const user = {

    auth_email: this.form.get('email')?.value,
    auth_password: this.form.get('password')?.value
  }
  this.authService.registerUser(user)!.subscribe(data=>{
    this.successMsg=true;
    setTimeout(()=>this.successMsg=false,4000)    
    this.errorMsg=data;   
    console.log('in authservice',data);
    return this.errorMsg;
  },err=> {
    console.log('error caught');
    this.errorMessage=err;
    this.serverErrors = true;
    setTimeout(()=>this.serverErrors=false,4000)
    console.log('server errors: ',this.errorMessage);
    return this.errorMessage;})
}
  ngOnInit(): void {
    
  }

}
