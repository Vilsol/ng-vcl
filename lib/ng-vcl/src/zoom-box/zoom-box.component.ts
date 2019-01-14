import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {ZoomBoxContainerComponent} from './zoom-box-container.component';

@Component({
  selector: 'vcl-zoom-box',
  templateUrl: 'zoom-box.component.html',
  host: {
    '[attr.role]': '"zoombox"',
  },
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ZoomBoxComponent {

  @Input()
  target: ZoomBoxContainerComponent;

  @Input()
  image: string | null;

  @Input()
  scale: number;

  get zoomedSource(): string {
    if (this.image) {
      return this.image;
    }

    return this.target.image;
  }

  get zoomedX(): number {
    if (this.image) {
      return this.target.x * this.scale;
    }

    return this.target.x;
  }

  get zoomedY(): number {
    if (this.image) {
      return this.target.y * this.scale;
    }

    return this.target.y;
  }

  get zoomedWidth(): number {
    if (this.image) {
      return this.target.width * this.scale;
    }

    return this.target.width;
  }

  get zoomedHeight(): number {
    if (this.image) {
      return this.target.height * this.scale;
    }

    return this.target.height;
  }

}
