import {DynamicModule, Module, Provider} from '@nestjs/common';
import { OptionsAsync } from './configuration';
import { MailgunService } from './services/relay/mailgun.service';
import { MAILGUN_CONFIGURATION } from './tokens/tokens';
import MailgunClientOptions from 'mailgun.js';

@Module({
  providers: [
    MailgunService,
  ],
  exports: [
   MailgunService,
  ],
})
export class MailgunModule {
  static forRoot(config: MailgunClientOptions) {
    return {
      module: MailgunModule,
      providers: [
        { provide: MAILGUN_CONFIGURATION, useValue: config },
      ],
    };
  }
  static forAsyncRoot(config: OptionsAsync): DynamicModule {
    return {
      global: true,
      module: MailgunModule,
      imports: config.imports ?? [],
      providers: [
       this.createAsyncProviders(config),
      ],
    };
  }

  private static createAsyncProviders(options: OptionsAsync): Provider {
    return {
      provide: MAILGUN_CONFIGURATION,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
