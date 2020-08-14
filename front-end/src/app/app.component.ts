import {Component} from '@angular/core';
import {MensajeService} from './services/mensaje.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  constructor(public mensajeService: MensajeService) {
  }
}
