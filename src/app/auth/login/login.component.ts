import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
   this.authService.user$.subscribe((user) => {
     user ? this.router.navigate(["/auth"]) : null;
   })
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  onSubmit(): void {
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.email as string, rawForm.password as string).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/auth')
      },
      error: (err: any) => {
        this.errorMsg = "Błąd";
        this.snackBar.open(this.errorMsg, 'Zamknij');
      }
    })
  }

}
