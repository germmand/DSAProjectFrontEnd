import { Component, Input, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ISubjectSummary } from '../../@interfaces';

@Component({
  selector: 'ngx-summary-adapter',
  templateUrl: './summary-adapter.component.html',
  styleUrls: ['./summary-adapter.component.scss'],
})
export class SummaryAdapterComponent implements OnInit {
  @Input() public subjects: ISubjectSummary[] = [];
  public tableSource: LocalDataSource = new LocalDataSource();
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

  ngOnInit() {
    this.tableSource.load(this.subjects.map(s => s.subject));
  }
}
