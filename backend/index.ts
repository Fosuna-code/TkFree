import { query, update, nat, Canister, Variant, text, Void } from 'azle';

// Those variables are not stable yet (It's not a persistent-storage feature)
// in the next version this code will store the information permanently and uses internet identity for validation

let id : nat = BigInt(7645);
let name = 'Fernando Osuna Manzo'

export default Canister({
    getId:query([],nat, ()=>id),
    getName:query([],text, ()=>name),

    addName:update([text],Void,(newName)=>{
        name =  newName;
    }),
    addId:update([nat],nat,(newId)=>{
        id =  newId;
        return id;
    }),
})