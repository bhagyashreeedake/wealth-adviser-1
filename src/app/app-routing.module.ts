import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ChartsComponent } from './components/charts/charts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvestmentComponent } from './components/investment/investment.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { LoansComponent } from './components/loans/loans.component';
import { IncomeExpenseComponent } from './components/income-expense/income-expense.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  // {
  //   path: 'chart',
  //   component: ChartsComponent,
  //   ...canActivate(redirectUnauthorizedToLogin),
  // },
  { path: 'chart', component: ChartsComponent},
  // {
  //   path: 'investment',
  //   component: InvestmentComponent,
  //   ...canActivate(redirectUnauthorizedToLogin),
  // },
  // {
  //   path: 'side-nav',
  //   component:SideNavComponent,
  //   ...canActivate(redirectUnauthorizedToLogin),
  // },
  // {
  //   path: 'transactions',
  //   component: TransactionComponent,
  //   ...canActivate(redirectUnauthorizedToLogin),
  // },
  // {
  //   path: 'income-expense',
  //   component: IncomeExpenseComponent,
  //   ...canActivate(redirectUnauthorizedToLogin),
  // },
  { path: 'dashboard', component: DashboardComponent},
  {path: 'investment', component:InvestmentComponent},
  {path:'side-nav',component:SideNavComponent},
  { path: 'transactions', component: TransactionComponent},
  { path: 'insurance', component: InsuranceComponent},
  { path: 'loan', component: LoansComponent},
  { path: 'income-expense', component: IncomeExpenseComponent},
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
