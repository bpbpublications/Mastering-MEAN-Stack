import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  
  }

  //fetchSession(): boolean {
  //  console.log(this.authService.tokenNotExpired());
  //  return this.authService.tokenNotExpired();
  //this.authService.getProfile().subscribe((data)=> {
  //  if (data!=null){
  //    return true;
  //  } else {
  //    return false;
  //  }
  //});

  //return true;
  //}

}