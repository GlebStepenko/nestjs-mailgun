import { Module, Provider } from '@nestjs/common';
import { OptionsAsync } from './configuration';
import { MailgunService } from './services/relay/mailgun.service';
import { MAILGUN_CONFIGURATION } from './tokens/tokens';
import {MailgunClientOptions} from 'mailgun.js';

@Module({})
export class MailgunModule {
  public static forRoot(config: MailgunClientOptions) {
    return {
      module: MailgunModule,
      providers: [
        { provide: MAILGUN_CONFIGURATION, useValue: config },
        MailgunService,
      ],
      exports: [MailgunService],
    };
  }
  public static forAsyncRoot(config: OptionsAsync) {
    return {
      module: MailgunModule,
      imports: config.imports || [],
      providers: [this.createAsyncProviders(config), MailgunService],
      exports: [MailgunService],
    };
  }
  private static createAsyncProviders(
    options: OptionsAsync,
  ): Provider {
    return {
      provide: MAILGUN_CONFIGURATION,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
