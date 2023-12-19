import { RowDataPacket } from "mysql2";
import Stripe from "stripe";

// INTERFACES
export interface IAuth extends RowDataPacket {
  id: string;
  ref: string;
  email: string;
  hash: string;
  status:
    | "active"
    | "paused"
    | "trialing"
    | "incomplete"
    | "past_due"
    | "unpaid"
    | "canceled"
    | "incomplete_expired";
  profiles: IProfile[];
  refresh_token: string;
  created_at: Date;
  last_modified: Date;
}

export interface IProfile extends RowDataPacket {
  id: string;
  name: string;
  auth_id: string;
}

export interface IStripeDetails extends RowDataPacket {
  customerId: string;
  billingInterval: string;
  paymentMethodBrand: string;
  paymentMethodLastFour: string;
  nextBillingDate: number;
  subscriptionStartDate: number;
}

// TYPES
export type Subscriber = {
  id: string;
  email: string;
  profiles: Profile[];
  status: string;
};

export type Profile = {
  id: string;
  name: string;
};

export type AuthResponse = {
  ok: boolean;
  data: AuthResponsePayload;
};

export type AuthResponsePayload = {
  message: string | null;
  payload: Subscriber | null;
};

export type StripeDetails = {
  billingInterval: string;
  paymentMethodBrand: string;
  paymentMethodLastFour: string;
  nextBillingDate: number;
  subscriptionStartDate: number;
};

// ENUMS
export enum STRIPE_STATUS {
  CREATED = "created",
  ACTIVE = "active",
  PAUSED = "paused",
  TRIALING = "trialing",
  INCOMPLETE = "incomplete",
  PAST_DUE = "past_due",
  UNPAID = "unpaid",
  CANCELED = "canceled",
  INCOMPLETE_EXPIRED = "incomplete_expired",
}
