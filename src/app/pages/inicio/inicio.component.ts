import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../@core/store/app.reducer';
import * as auth from '../../@core/store/auth';
import {getId} from '../../@core/store/user';

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

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
  }

  onClickedButton(): void {
      this.store.pipe(select('auth'))
        .subscribe(data => {
          alert('Access: ' + data.access_token + '\nRefresh: ' + data.refresh_token);
        });

      this.store.pipe(select(auth.getAccessToken))
        .subscribe(access_token => {
          alert('Access: ' + access_token);
        });

      this.store.pipe(select(auth.getRefreshToken))
        .subscribe(refresh_token => {
          alert('Refresh: ' + refresh_token);
        });

      this.store.pipe(select(getId))
        .subscribe(id => {
          alert('Id: ' + id);
        });
  }
}
