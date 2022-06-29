import { Request } from "express";
export interface loginrequest extends Request{
    Email:string;
    Password:string
}
export interface signuprequest extends Request{
    Email: string,
    Phone: string,
    Password: string

}