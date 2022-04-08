/*
 * angular-todo-prototype
 *
 * app.module.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { TextComponent } from './features/journey/text/text.component';
import { PasswordComponent } from './features/journey/password/password.component';
import { HomeComponent } from './views/home/home.component';
import { TodosComponent } from './views/todos/todos.component';
import { LogoutComponent } from './features/logout/logout.component';
import { TodoComponent } from './features/todo/todo.component';
import { BackHomeComponent } from './utilities/back-home/back-home.component';
import { LoadingComponent } from './utilities/loading/loading.component';
import { HomeIconComponent } from './icons/home-icon/home-icon.component';
import { LeftArrowIconComponent } from './icons/left-arrow-icon/left-arrow-icon.component';
import { KeyIconComponent } from './icons/key-icon/key-icon.component';
import { FormComponent } from './features/journey/form/form.component';
import { ButtonComponent } from './features/journey/button/button.component';
import { EyeIconComponent } from './icons/eye-icon/eye-icon.component';
import { AlertComponent } from './features/journey/alert/alert.component';
import { AlertIconComponent } from './icons/alert-icon/alert-icon.component';
import { VerifiedIconComponent } from './icons/verified-icon/verified-icon.component';
import { RegisterComponent } from './views/register/register.component';
import { UnknownComponent } from './features/journey/unknown/unknown.component';
import { BooleanComponent } from './features/journey/boolean/boolean.component';
import { TermsConditionsComponent } from './features/journey/terms-conditions/terms-conditions.component';
import { KbaComponent } from './features/journey/kba/kba.component';
import { LockIconComponent } from './icons/lock-icon/lock-icon.component';
import { NewUserIconComponent } from './icons/new-user-icon/new-user-icon.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AngularIconComponent } from './icons/angular-icon/angular-icon.component';
import { ForgerockIconComponent } from './icons/forgerock-icon/forgerock-icon.component';
import { TodosIconComponent } from './icons/todos-icon/todos-icon.component';
import { AccountIconComponent } from './icons/account-icon/account-icon.component';
import { TodoIconComponent } from './icons/todo-icon/todo-icon.component';
import { ActionIconComponent } from './icons/action-icon/action-icon.component';
import { ChoiceComponent } from './features/journey/choice/choice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TextComponent,
    PasswordComponent,
    HomeComponent,
    TodosComponent,
    LogoutComponent,
    TodoComponent,
    BackHomeComponent,
    LoadingComponent,
    HomeIconComponent,
    LeftArrowIconComponent,
    KeyIconComponent,
    FormComponent,
    ButtonComponent,
    EyeIconComponent,
    AlertComponent,
    AlertIconComponent,
    VerifiedIconComponent,
    RegisterComponent,
    UnknownComponent,
    BooleanComponent,
    TermsConditionsComponent,
    KbaComponent,
    LockIconComponent,
    NewUserIconComponent,
    HeaderComponent,
    FooterComponent,
    AngularIconComponent,
    ForgerockIconComponent,
    TodosIconComponent,
    AccountIconComponent,
    TodoIconComponent,
    ActionIconComponent,
    ChoiceComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
