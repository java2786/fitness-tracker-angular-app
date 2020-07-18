import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../_services";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  styleUrls: ['./place-fitness-trainer-appointment.component.css']
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  @Output() fitnessdata = new EventEmitter<Fitness>();

  fitnessForm: FormGroup;
  public obj: any = {};

  constructor(private fb: FormBuilder, private userService: UserService) { }
  fitnessData: any;

  ngOnInit() {
    this.fitnessForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      age:["",[Validators.required]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      streetaddress: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      pincode: ["", [Validators.required]],
      trainerpreference:["", [Validators.required]],
      physiotherapist:["", [Validators.required]],
      packages:["", [Validators.required]],
      inr: ["", [Validators.required]],
      paisa: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
      this.fitnessForm.value
    );
  
    if (this.fitnessForm.valid) {
      this.fitnessdata.emit(
        new Fitness(
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.email,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.state,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.trainerpreference,
          this.fitnessForm.value.physiotherapist,
          this.fitnessForm.value.packages,
          this.fitnessForm.value.inr,
          this.fitnessForm.value.paisa,
        )
      );
    }

    var data = this.fitnessForm.value;
    this.userService.postfitnessdata(data).subscribe(
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
