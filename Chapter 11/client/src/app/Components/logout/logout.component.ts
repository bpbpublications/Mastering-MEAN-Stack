import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  constructor(private authService:AuthService,private cookie:CookieService) { }

  ngOnInit(): void {
    console.log('deleting cookies');
    const user = {
      auth_email: 'pinakinc@yahoo.com',
      auth_password: 'Pc9121975!'
    }
    this.authService.signoutUser(user).subscribe(data=>{
      console.log('data',data);
    //  return this.errorMsg;
  },err=> {
    console.log('err',err)
  //  return this.errorMessage;
    });
  }

}
