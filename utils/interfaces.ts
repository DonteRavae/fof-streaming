import { RowDataPacket } from "mysql2";

export interface IAuth extends RowDataPacket {
  id: string;
  ref: string;
  email: string;
  hash: string;
  verified: boolean;
  refresh_token: string;
  created_at: Date;
  last_modified: Date;
}

export interface IProfile extends RowDataPacket {
  id: string;
  name: string;
  auth_id: string;
} 

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
  payload: Profile[] | null;
};