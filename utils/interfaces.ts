import { RowDataPacket } from "mysql2";

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

// TYPES
export type Subscriber = {
  id: string;
  email: string;
  profiles: Profile[];
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
