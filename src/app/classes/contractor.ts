export class Contractor {
  constructor (
    public id?: number,
    public name?: string,
    public address?: string,
    public nip_number?: number,
    public regon_number?: number,
    public bank_account_number?: number,
    public payment_form?: string,
    public active_taxpayer_vat_tax?: boolean
  ) {}
}
