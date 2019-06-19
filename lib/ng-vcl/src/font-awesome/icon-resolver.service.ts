import { Injectable } from '@angular/core';
import { VCLIconResolverServiceBase, IconResolverService } from '../icon/index';
import { ALIAS_MAP } from './alias-map';

// The font-awesome name resolver following the CSS class name conventions of
// the well-known Font Awesome icon font. Basically it translates
// `fas:user` into `fas fa-user`
@Injectable()
export class FontAwesomeIconResolverService extends VCLIconResolverServiceBase implements IconResolverService {
  constructor() { super(ALIAS_MAP); }

  private FA_REGEX = /^(fa[bsrl]):([a-z0-9-_]+)$/;

  resolveFallback(icon: string) {
    const result =  this.FA_REGEX.exec(icon);
    if (result) {
      const [, prefix, value] = result;
      return `${prefix} fa-${value}`;
    }
    return undefined;
  }
}
