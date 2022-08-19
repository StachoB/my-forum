import { useGetComPubliQuery } from 'src/store/rtk/comments';
import Comm from './comments';

function GetComments(props : {_id : string}) {
const {data} = useGetComPubliQuery({publiId : props._id})
if (typeof data === 'object'){
 return (
  <div className='getcomments'>

        {data?.map((comment: { _id: string; text:string; date:string; user:string; post : string}) =>{
            return <div key = {comment._id}>
            <Comm id={comment._id} text={comment.text} date={comment.date} user={comment.user} post={comment.post} />
        </div>
})}
  </div>
)}
else return (
<div>
</div>)
    
}

export default GetComments;