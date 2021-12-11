import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { AuthService } from "../services/auth/login/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  json: any = null;

  showPasswordInput: boolean = false;

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) {
    localStorage.clear();
    sessionStorage.clear();
  }

  onSubmit() {
    this.message = null;
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set("username", this.loginForm.controls.username.value)
      .set("password", this.loginForm.controls.password.value)
      .set("grant_type", "password");

    this.auth.login(body.toString()).subscribe(
      (data: any) => {
        
        if (data.error) {
          this.message = "Invalidate credential, try again.";
          return;
        }
        this.json = data;
        this.auth.saveToken(this.json.access_token);
        this.router.navigate(["/"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showPassword(){
    var element = document.getElementById("iconPassword");
    var visibility = document.getElementsByClassName("icon-visibility");
    if(visibility.length>0){
      element.classList.remove("icon-visibility");
      element.classList.add("icon-visibility_off");
      (<HTMLInputElement>document.getElementById('password')).type = 'text';
    }
    else {
      element.classList.remove("icon-visibility_off");
      element.classList.add("icon-visibility");
      (<HTMLInputElement>document.getElementById('password')).type = 'password';
    }
    
  

  }
  ngOnInit() {
    window.sessionStorage.removeItem("token");
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.required],
    });

    const error = this.activatedRoute.snapshot.paramMap.get("error");
    if (error != null) {
      this.message = error;
    }
  }

}
