import { atom } from "recoil";
interface userDetails{
    default:string
}
export const userDetails= atom({
    key:"userDetails",
    default:""
})