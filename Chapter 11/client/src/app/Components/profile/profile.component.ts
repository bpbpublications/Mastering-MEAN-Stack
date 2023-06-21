import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  auth_email: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile()
    .pipe(map((responseData: any)=>{
      const userArray = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)) {
        userArray.push({...responseData,id: key});
        }
      }
      console.log(userArray);
      return responseData;
    }
    ))
    .subscribe(data=>{
      //this.auth_email=;

      if (data['currentUser']!=null){
      this.auth_email = data['currentUser'].auth_email;
      }
      
    
  },err=> {
    console.log('err',err);
    })
  }
  }

  


