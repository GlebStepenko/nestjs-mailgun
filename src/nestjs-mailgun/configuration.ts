import { ModuleMetadata } from '@nestjs/common/interfaces';
import {MailgunClientOptions} from 'mailgun.js/definitions';

export interface OptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => MailgunClientOptions | Promise<MailgunClientOptions>;
  inject?: any[];
}
