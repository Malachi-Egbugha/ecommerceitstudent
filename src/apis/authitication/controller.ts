import {createCustomer,validateuser} from './services';
import { Response } from "express";
import {loginrequest,signuprequest} from './requestdefination';
export const signup = async (req:signuprequest, res:Response | any) =>{
    try{
        const queryresult = await createCustomer(req.body);
        res.json({queryresult, status:true});

    }
    catch(e:any){
        console.log(e);
        res.status(400).json({status: false, msg:e.message})
    }


}
export const login = async (req:loginrequest , res:Response | any)=>{
    const {Email, Password} = req.body;
    try{
        const {user,isValid} = await validateuser({Email,Password});
        if(!isValid){
            return res.status(401).json({msg:"invalid Email or password", status: false});

        }
        const token =user.getSignedJWToken();
        res
  .status(200)
  .cookie("token", token)
  .json({status: true, token});

        

        


    }
    catch(e:any){

    }


}