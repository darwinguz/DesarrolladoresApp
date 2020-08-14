import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {CrearDesarrolladorPageComponent} from './pages/crear-desarrollador-page/crear-desarrollador-page.component';
import {DesarrolladorPageComponent} from './pages/desarrollador-page/desarrollador-page.component';
import {ListboxModule} from 'primeng/listbox';
import {RippleModule} from 'primeng/ripple';
import {TooltipModule} from 'primeng/tooltip';
import {EditarDesarrolladorPageComponent} from './pages/editar-desarrollador-page/editar-desarrollador-page.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {UrlTokenPipe} from './pipes/url-token.pipe';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    CrearDesarrolladorPageComponent,
    DesarrolladorPageComponent,
    EditarDesarrolladorPageComponent,
    UrlTokenPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ListboxModule,
    RippleModule,
    TooltipModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    CardModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
