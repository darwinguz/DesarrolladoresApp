import {Injectable} from '@angular/core';
import {ConfirmationService, Message, MessageService} from 'primeng/api';

/**
 * Proveedor inyectable para mostrar mensajes.
 * @author Darwin Guzmán
 */
@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  public messages: Message[] = [];

  private readonly SEVERITY_INFO = 'info';
  private readonly SEVERITY_WARN = 'warn';
  private readonly SEVERITY_ERROR = 'error';
  private readonly SEVERITY_SUCCESS = 'success';

  private readonly SUMMARY_INFO = 'Información';
  private readonly SUMMARY_WARN = 'Advertencia';
  private readonly SUMMARY_ERROR = 'Error';
  private readonly SUMMARY_SUCCESS = 'Éxito';

  constructor(
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
  }

  mostrarToastInformacion(mensaje: string): void {
    this.messages = [];
    this.messageService.add({severity: this.SEVERITY_INFO, summary: this.SUMMARY_INFO, detail: mensaje});
  }

  mostrarToastAdvertencia(mensaje: string): void {
    this.messages = [];
    this.messageService.add({severity: this.SEVERITY_WARN, summary: this.SUMMARY_WARN, detail: mensaje});
  }

  mostrarToastError(mensaje: string): void {
    this.messages = [];
    this.messageService.add({severity: this.SEVERITY_ERROR, summary: this.SUMMARY_ERROR, detail: mensaje});
  }

  mostrarToastExito(mensaje: string): void {
    this.messages = [];
    this.messageService.add({severity: this.SEVERITY_SUCCESS, summary: this.SUMMARY_SUCCESS, detail: mensaje});
  }

  mostrarMenssageInformacion(mensaje: string): void {
    this.messages = [];
    this.messages.push({severity: this.SEVERITY_INFO, summary: this.SUMMARY_INFO, detail: mensaje});
  }

  mostrarMessageAdvertencia(mensaje: string): void {
    this.messages = [];
    this.messages.push({severity: this.SEVERITY_WARN, summary: this.SUMMARY_WARN, detail: mensaje});
  }

  mostrarMessageError(mensaje: string): void {
    this.messages = [];
    this.messages.push({severity: this.SEVERITY_ERROR, summary: this.SUMMARY_ERROR, detail: mensaje});
  }

  mostrarMessageExito(mensaje: string): void {
    this.messages = [];
    this.messages.push({severity: this.SEVERITY_SUCCESS, summary: this.SUMMARY_SUCCESS, detail: mensaje});
  }

  mostrarMensajeConfirmacion(mensaje: string, aceptarCallback, rechazarCallback?): void {
    this.confirmationService.confirm({
      message: mensaje,
      header: 'Mensaje de Confirmación',
      icon: 'pi pi-info-circle',
      accept: aceptarCallback,
      reject: rechazarCallback
    });
  }

}
