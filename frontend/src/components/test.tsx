import React from "react";
import { useGetUserByIdQuery } from "src/store/rtk/user";
import { CommentType } from "src/types/commentType";

const Test = () => {
const {data:res} = useGetUserByIdQuery({userId : "62ea4e3870c55985fcc459f7"})
console.log(res)
return (<div className="containerComment">
        ok
    </div>)
}
    
export default Test;