import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BookingGuard } from './booking.guard';
import { AdminComponent } from './admin/admin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PolicyComponent } from './policy/policy.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'booking', component: BookingComponent, canActivate: [BookingGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'admin', component: AdminComponent, canActivate:[BookingGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
