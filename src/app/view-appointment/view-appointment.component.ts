import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services";

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  constructor(private userService: UserService) { }

  fitnessData:any;

  ngOnInit() {
     this.getfitness();
  }
  
  getfitness() {
    this.userService.getfitnessdata().subscribe(
      data => {
        console.log(
          "LOG: LoginComponent -> onSubmit -> data",
          JSON.stringify(data)
        );
         this.fitnessData = data;
      },
      error => {
        console.log("LOG: LoginComponent -> onSubmit -> error", error);
      }
    );
  }
}
