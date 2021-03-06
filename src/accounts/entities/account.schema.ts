import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';

export type AccountDocument = Account & Document;

const EMAIL_REGEXP = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// note: this nested structure could be defined as an annotated class as well, but it makes more sense to make it a simple
// interface and privately define the schema (will be included in the exported AccountSchema anyway)
export interface OptInData {
  news_offers: boolean;
  device_info_upload: boolean;
  analytics: boolean;
}
const OptInDataSchema = new MSchema(
  {
    news_offers: { type: Boolean },
    device_info_upload: { type: Boolean },
    analytics: { type: Boolean },
  },
  { _id: false },
);

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true, unique: true, index: true, match: EMAIL_REGEXP })
  email: string;

  @Prop({ required: true })
  auth_provider: string;

  @Prop({ required: true, match: EMAIL_REGEXP })
  auth_provider_email: string;

  @Prop()
  organization_id?: string;

  @Prop({
    required: true,
    enum: ['pending', 'active', 'blocked'],
    default: 'pending',
  })
  status: 'pending' | 'active' | 'blocked';

  @Prop()
  phone?: string;

  @Prop({ maxLength: 2 })
  country?: string;

  @Prop({ maxLength: 10 })
  lang?: string;

  @Prop({ maxLength: 1024 })
  notes?: string;

  @Prop({ minLength: 3, maxLength: 100 })
  name?: string;

  @Prop({ maxLength: 100 })
  company?: string;

  @Prop({ type: OptInDataSchema })
  opt_in?: OptInData;

  @Prop({
    type: [String],
    required: true,
    validate: (val: string) => val !== undefined && val.length > 0,
  })
  roles: string[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
