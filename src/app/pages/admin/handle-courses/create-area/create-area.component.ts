import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AreasService } from '../../../../@core/data/areas.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { IArea } from '../@interfaces';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-create-area',
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.scss'],
})
export class CreateAreaComponent {
  @Output() newAreaAdded = new EventEmitter<IArea>();
  public formSubmitted: boolean;
  public config: ToasterConfig;
  public newAreaForm: FormGroup = new FormGroup({
    area_name: new FormControl('', [Validators.required]),
  });

  constructor(private areasService: AreasService,
              private toasterService: ToasterService) {
    this.formSubmitted = false;
    this.config = new ToasterConfig({
      positionClass: 'toast-center',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideUp',
      limit: 2,
    });
  }

  get areaForm(): any {
    return this.newAreaForm.controls;
  }

  onCreateNewArea() {
    this.formSubmitted = true;

    if (!this.newAreaForm.valid) {
      return;
    }

    this.areasService
      .onCreateNewArea(this.newAreaForm.value)
      .subscribe(response => {
        const toast: Toast = {
          type: 'default',
          title: 'Mensaje',
          body: response['message'],
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);

        this.newAreaForm.controls['area_name'].setValue('');
        this.formSubmitted = false;
        this.newAreaAdded.emit(<IArea>response['area']);
      }, exception => {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          body: exception.error['error'],
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
      });
  }
}
