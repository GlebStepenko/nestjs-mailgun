import { Injectable, Inject } from '@nestjs/common';
import { MAILGUN_CONFIGURATION } from '../../tokens/tokens';
import Mailgun from 'mailgun.js';
import {
  DeletedMember, MailListMember, CreateUpdateMailListMembers, MultipleMembersData, NewMultipleMembersResponse, DestroyedList,
  MailingList, CreateUpdateList, ValidationResult, MessagesSendResult, MailgunMessageData, MailgunClientOptions, Interfaces} from 'mailgun.js/definitions';

export interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  attachment?;
  'h:X-Mailgun-Variables'?: string;
}
@Injectable()
export class MailgunService {
  private readonly mailgun: Interfaces.IMailgunClient;
  constructor(@Inject(MAILGUN_CONFIGURATION) private readonly _configuration: MailgunClientOptions) {
    this.mailgun = new Mailgun(FormData).client(this._configuration);
  }

  createEmail = async (domain: string, data: MailgunMessageData): Promise<MessagesSendResult> => {
    return this.mailgun.messages.create(domain, data);
  }

  validateEmail = async (email: string): Promise<ValidationResult> => this.mailgun.validate.get(email);

  createList = async (data: CreateUpdateList): Promise<MailingList> =>
    this.mailgun.lists.create(data)

  destroyList = async (mailListAddress: string): Promise<DestroyedList> => this.mailgun.lists.destroy(mailListAddress);

  getList = async (mailListAddress: string): Promise<MailingList> =>
    this.mailgun.lists.get(mailListAddress)

  updateList = async (mailListAddress: string, data: CreateUpdateList): Promise<MailingList> => this.mailgun.lists.update(mailListAddress, data);

  listAddMember = async (mailListAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember> =>
    this.mailgun.lists.members.createMember(mailListAddress, data)

  listCreateMembers = async (mailListAddress: string, data: MultipleMembersData): Promise<NewMultipleMembersResponse> =>
    this.mailgun.lists.members.createMembers(mailListAddress, data)

  listupdateMember = async (address: string, memberAddress: string, data: CreateUpdateMailListMembers): Promise<MailListMember> =>
    this.mailgun.lists.members.updateMember(address, memberAddress, data)

  listDestroyMember = async (address: string, memberAddress: string): Promise<DeletedMember> =>
    this.mailgun.lists.members.destroyMember(address, memberAddress)
}
