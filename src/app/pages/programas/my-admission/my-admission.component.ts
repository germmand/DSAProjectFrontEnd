import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-my-admission',
  templateUrl: './my-admission.component.html',
  styleUrls: ['./my-admission.component.scss'],
})
export class MyAdmissionComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        return paramMap.get('id');
      }),
    );
  }
}
