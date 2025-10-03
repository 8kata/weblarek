import { TPayment } from "../../types";
import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  protected _payment: TPayment;
  protected _address: string;
  protected _phone: string;
  protected _email: string;

  constructor(payment: TPayment = 'card', address: string = "", phone: string = "", email: string = "", protected events: IEvents){
    this._payment = payment;
    this._address = address;
    this._phone = phone;
    this._email = email;
  }

  set payment(value: TPayment) {
    this._payment = value;
    this.events.emit('order:changed');

  }
  set address(value: string) {
    this._address = value;
    this.events.emit('order:changed');
  }

  set phone(value: string) {
    this._phone = value;
    this.events.emit('order:changed');
  }

  set email(value: string) {
    this._email = value;
    this.events.emit('order:changed');
  }

  getOrder(): IBuyer{
    const order = {
    payment: this._payment,
    address:  this._address,
    phone:  this._phone,
    email:  this._email
    };
    return  {...order};
  }

  clearOrder(){
    this._payment = "card";
    this._address = "";
    this._phone = "";
    this._email = "";
  }

  validateForm(form: "addressForm" | "contactsForm" ): {isValid: boolean, error: string} {
    const data = this.getOrder();
    if (form === "addressForm") {
      const isValid = Boolean(data.address);
      return {isValid, error: isValid ? '' :  'Необходимо указать адрес'}
    }
    if (form === "contactsForm"){
      const emailValid = Boolean(data.email);
      const phoneValid = Boolean(data.phone);
      if (!emailValid && !phoneValid) {
      return {
          isValid: false,
          error: "Необходимо указать email и телефон"
        } 
      } else if (!emailValid) {
        return {
          isValid: false,
          error: "Необходимо указать email"
        } 
      } else if (!phoneValid){
          return {
          isValid: false,
          error: "Необходимо указать телефон"
        } 
      } 
      return {isValid: true, error: ""}
    }
    return {isValid: false, error: ""}
  }
}