import { Component, Input } from '@angular/core';
import { ISubject } from '../../@interfaces';

@Component({
  selector: 'ngx-summary-adapter',
  templateUrl: './summary-adapter.component.html',
  styleUrls: ['./summary-adapter.component.scss'],
})
export class SummaryAdapterComponent {
  @Input() public subjects: ISubject[] = [];
  public tableSettings: any = {
    actions: false,
    noDataMessage: 'No hay materias que cargar acá...',
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      subject_semester: {
        title: 'Semester',
        type: 'number',
      },
      credits: {
        title: 'Créditos',
        type: 'number',
      },
      hours_per_week: {
        title: 'Horas/Semana',
        type: 'number',
      },
      weeks: {
        title: 'Semanas',
        type: 'string',
      },
    },
  };

  constructor() {
  }
}
