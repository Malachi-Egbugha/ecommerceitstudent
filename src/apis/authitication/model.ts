import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export interface CustomerInput{
Email: string,
Phone: string;
Password: string;

}
export interface CustomerDocument extends CustomerInput
{

comparePassword(candidatePassword: string):Promise<Boolean> | Promise<any>

}



//schema for customer
const CustomerSchema = new Schema({
    Email: {type: String, required: true},
    Phone: {type: String, required: true},
    Password:{type: String, required: true},
    },
    {
        timestamps: true,
    
    });

    CustomerSchema.pre("save", async function(next){
        try{
            //Generate salt
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hashSync(this.Password, salt);
            //re-assign hashed version of original
            this.Password = hash;
            next();

        }
        catch(err:any){
            next(err)

        }

    });
    CustomerSchema.methods.comparePassword = async function(candidatePassword: string):Promise<any>{
        const customer = this as CustomerDocument;
        try{
        return bcrypt.compare(candidatePassword, customer.Password);
        }
        catch(error){
            return false;
        }
    }
    CustomerSchema.methods.getSignedJWToken = function (){
        return jwt.sign({id: this._id}, process.env.KEYGEN as string,{expiresIn:"3d"})
    }


export default model<CustomerDocument>("Customers",CustomerSchema);




 