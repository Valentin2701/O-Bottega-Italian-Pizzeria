import { map, pipe } from "rxjs";
import { APIResponse } from "../types/APIResponse";

export function errorGuard(){
    return pipe(map((response: APIResponse) => {
        if(response.error){
            throw response.message;
        }
        return response;
    }));
}
