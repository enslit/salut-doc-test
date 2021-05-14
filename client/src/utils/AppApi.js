import { FetchApi } from './FetchApi';

export class AppApi extends FetchApi {
  getDoctors() {
    return this._fetch('doctor');
  }

  getAppointments() {
    return this._fetch('appointment');
  }

  createAppointment(form) {
    return this._fetch('appointment', 'POST', form);
  }

  deleteAppointment(id) {
    return this._fetch(`appointment/${id}`, 'DELETE');
  }
}
