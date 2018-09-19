import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../@core/store/app.reducer';
import { AdmissionsService } from '../../@core/data/admissions.service';

@Component({
  selector: 'ngx-inicio',
  styleUrls: ['./inicio.component.scss'],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
  public descriptors: any[] = [{
    title: 'Programas avanzados',
    description: 'Haz la mejor elección para tu educación.',
    image: 'assets/images/advanced.jpg',
  }, {
    title: 'Paciencia y persistencia',
    description: 'Trabaja duro para obtener buenos resultados.',
    image: 'assets/images/workhard.jpg',
  }, {
    title: 'Prepárate para un futuro éxitoso',
    description: 'Mantente activo y competitivo.',
    image: 'assets/images/active.jpg',
  }, {
    title: 'Planificación y organización',
    description: 'Convierte tus metas en realidad.',
    image: 'assets/images/teamwork.jpg',
  }];

  public states: any[] = [{
    title: 'Aceptadas',
    quantity: 0,
    type: 'primary',
    iconClassFront: 'nb-lightbulb',
    iconClassBack: 'fa fa-grin',
    backText: `Contador de postgrados inscritos y aceptados.`,
  }, {
    title: 'Declinadas',
    quantity: 0,
    type: 'danger',
    iconClassFront: 'nb-close-circled',
    iconClassBack: 'fa fa-angry',
    backText: `Contador de postgrados inscritos y rechazados.`,
  }, {
    title: 'En revisión',
    quantity: 0,
    type: 'warning',
    iconClassFront: 'nb-loop-circled',
    iconClassBack: 'fa fa-user-clock',
    backText: `Contador de postgrados inscritos y en espera de aceptación.`,
  }];

  constructor(private store: Store<IAppState>,
              private admissionsService: AdmissionsService) {
  }

  ngOnInit(): void {
   this.admissionsService.onGetAdmissionsStatuses()
      .subscribe(response => {
        this.states[0].quantity = response.accepted;
        this.states[1].quantity = response.declined;
        this.states[2].quantity = response.review;
      }, error => {

      });
  }
}
