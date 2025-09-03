// party.model.ts
export interface Party {
  id?: number;
  name: string;
  company_name: string;
  mobile_no: string;
  telephone_no?: string;
  whatsapp_no?: string;
  email?: string;
  gst_type: string;
  gstin?: string;
  pan_no?: string;
  credit_limit?: number;
  opening_balance?: number;
  opening_balance_type?: string;
  login_access: boolean;
  apply_tds: boolean;
  is_active?: boolean;
  address?: any[];
  bank_id?: any[];
}
