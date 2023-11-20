import { Component, ViewChild } from '@angular/core';

import { TestseveceService } from 'src/app/testsevece.service';
import {
  DxDrawerComponent, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule,
} from 'devextreme-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-invioce',
  templateUrl: './create-invioce.component.html',
  styleUrls: ['./create-invioce.component.css']
})
export class CreateInvioceComponent {

  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;

  navigation: any[];

  showSubmenuModes: string[] = ['slide', 'expand'];

  positionModes: string[] = ['left', 'right'];

  showModes: string[] = ['push', 'shrink', 'overlap'];

  text: string;

  selectedOpenMode = 'shrink';

  selectedPosition = 'left';

  selectedRevealMode = 'slide';

  isDrawerOpen = true;

  elementAttr: any;

  constructor(service: TestseveceService,  private router: Router,) {
    this.text = service.getContent();
    this.navigation = service.getNavigationList();

  }
   

  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      onClick: () => this.isDrawerOpen = !this.isDrawerOpen,
    },
  }]}
