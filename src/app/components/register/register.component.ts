import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private _fb: FormBuilder ,
              private _AuthService:AuthService ,
              private _Router:Router,
              private _ToastrService:ToastrService
               ) { }
  registerForm!: FormGroup
  hide = true;

  createForm(): void {
    this.registerForm = this._fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/(com|net)$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      age: ['', [Validators.required]],
    })
  }

ngOnInit(): void {
this.createForm()
}
register(formData:FormGroup): void{
    if (formData.valid) {
      this._AuthService.register(formData.value).subscribe({
        next:response=>{
          if(response.message ==='success'){
            this._Router.navigate(['/login'])
          }else{
              this._ToastrService.warning(response.errors.email.message , 'Error')              
          }
        }
      }) 
    }   
}






}
