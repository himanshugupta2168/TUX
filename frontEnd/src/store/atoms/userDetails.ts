import { atom } from "recoil";
interface userDetails{
    default:{
        name:string, 
        id:string
    }
}
export const userDetails= atom({
    key:"userDetails",
    default:{
        name:"Anonymous",
        id:"",
    }
})