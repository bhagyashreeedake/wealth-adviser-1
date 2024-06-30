import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { LandingComponent } from './components/landing/landing.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatTableModule } from '@angular/material/table';
import { ChartsComponent } from './components/charts/charts.component';
import { FormsModule } from '@angular/forms'; 
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvestmentComponent } from './components/investment/investment.component';
import { InvesstmentDialogComponent } from './components/invesstment-dialog/invesstment-dialog.component';
// import { InvestmentComponent } from './components/investment/investment.component';
// import { InvestmentDialogComponent } from './components/investment-dialog/investment-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { NewTransactionDialogComponent } from './components/new-transaction-dialog/new-transaction-dialog.component';
// import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { LoansComponent } from './components/loans/loans.component';
import { IncomeExpenseComponent } from './components/income-expense/income-expense.component';
import { TransactionPopupComponent } from './components/transaction-popup/transaction-popup.component';
import { MatSelectModule } from '@angular/material/select';
import { InsuraanceDialogComponent } from './components/insuraance-dialog/insuraance-dialog.component';
import { LoanDialogComponent } from './components/loan-dialog/loan-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,
    HomeComponent,
    ProfileComponent,
    ChartsComponent,
    DashboardComponent,
    InvestmentComponent,
    InvesstmentDialogComponent,
    TransactionComponent,
    NewTransactionDialogComponent,
    InsuranceComponent,
    LoansComponent,
    IncomeExpenseComponent,
    TransactionPopupComponent,
    InsuraanceDialogComponent,
    LoanDialogComponent,
    
    
    
    // 
    
    // InvestmentComponent,
    // InvestmentDialogComponent,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatMenuModule,
    MatDialogModule,
    SideNavComponent,
    MatTableModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule

    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
