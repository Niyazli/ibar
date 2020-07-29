import { Component, Input, OnInit } from '@angular/core';
import {
  AlignItemsType,
  FlexDirectionType,
  FlexWrapType,
  JustifyContentType,
} from './types/flex-box.type';

@Component({
  selector: 'flexbox',
  template: `
    <div
      [style.height]="'inherit'"
      [style.align-items]="alignItems"
      [style.display]="'flex'"
      [style.justify-content]="justifyContent"
      [style.flex-direction]="flexDirection"
      [style.flex-wrap]="flexWrap"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./flex-box.component.scss'],
})
export class FlexBoxComponent implements OnInit {
  @Input() alignItems: AlignItemsType;
  @Input() justifyContent: JustifyContentType;
  @Input() flexDirection: FlexDirectionType;
  @Input() flexWrap: FlexWrapType;
  constructor() {}

  ngOnInit(): void {}
}
