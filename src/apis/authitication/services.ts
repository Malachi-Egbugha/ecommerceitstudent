import customermodel, {CustomerDocument,CustomerInput} from './model';
export async function createCustomer(input: CustomerInput){
    try{
        return await customermodel.create(input);
    }
    catch(err:any){
        console.log(err);
        throw new Error("Error in signing up customer please contact administrator")

    }

}
export async function readCustomer(query: any){
    
    try{
    return await customermodel.find(query).sort({createdAt: -1});
    }
    catch(e:any){
        throw new Error("Error in reading Customer record please contact administrator");

    }
}
export async function validateuser({Email,Password}:{Email:string, Password:string}):Promise<any>{
    try{
        const user = await customermodel.findOne({Email});
        if(!user){
            return false;
        }
        const isValid = await user.comparePassword(Password);
        return {isValid,user};

    }
    catch(e:any){
        return false;

    }


}
