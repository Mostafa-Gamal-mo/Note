import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private _fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService) { }
  loginForm!: FormGroup
  hide = true;

  createForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/(com|net)$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    })
  }

  ngOnInit(): void {
    this.createForm()
  }
  login(formData: FormGroup): void {
    if (formData.valid) {
      this._AuthService.login(formData.value).subscribe({
        next: response => {
          if (response.message === 'success') {
            console.log(response);
            localStorage.setItem('_notetokem',response.token)
            this._AuthService.userData()

            this._Router.navigate(['/home'])
          } 
          else {
            this._ToastrService.warning(response.message)
          }
        }
      })
    }
  }



}
