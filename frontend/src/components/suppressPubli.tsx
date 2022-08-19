import { useDeletePubliMutation} from "src/store/rtk/publications";
import { useGetProfileQuery} from "src/store/rtk/user";

function SuppressPubli(props : {publiId : string, userId: string}){


    const [deletePubli, res] = useDeletePubliMutation()
    function DeletePost() {
        const res = deletePubli({publiId : props.publiId})
    }

    const {data} = useGetProfileQuery({});
return (
<div className="suppressPubli">
{data?.userId === props.userId && <div>
    <button type="button" className="btn btn-outline-danger" onClick={DeletePost} >
        Suppress my post
    </button></div>
}
</div>

);
}
    
export default SuppressPubli;