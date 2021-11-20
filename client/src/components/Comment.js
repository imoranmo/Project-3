import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { UPDATE_COMMENT, ADD_COMMENT, DELETE_COMMENT } from '../utils/mutations';


const Comment = ({data, postId}) => {

    const [addComment, { error: addError, data: addData }] = useMutation(ADD_COMMENT);
    const [updateComment, { error: updateError, data: updateData }] = useMutation(UPDATE_COMMENT);
    const [deleteComment, { error: deleteError, data: deleteData }] = useMutation(DELETE_COMMENT);

    const [commentState, setCommentState] = useState([...data]);

    const activeUser = Auth.getProfile().data._id
    
    const postComment = async (event) => {
        let content
        event.preventDefault();
        if(event.code === "Enter" || event.code === "NumpadEnter"){
           content = event.target.value       
            if (content && activeUser){
               const newComment = await addComment({variables: {
                    content, activeUser, postId
                }})
                event.target.value = ""
                setCommentState([...commentState, newComment.data.addComment ])
            }
        }
        return true;
    }
    const editComment = async (event) => {
        event.preventDefault();
        const content = event.target.value;
        const _id = event.target.dataValue;
        // const commentInput = document.createElement("input")
        //     commentInput.type = "submit"
        // <input type="submit" onSubmit={postComment} name="editComment" data-value="{{post.id}}" id="comment" placeholder="Add a comment!" className="mt-4 w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-black focus:bg-white focus:outline-none " autoComplete='true' required />

        // event.target.parentNode.replaceChild(commentInput, event.target);

        // if (content && activeUser){
        //    return await updateComment({variable: {
        //         content, activeUser, _id
        //     }});
        // }
        return;
    }    
    
    const removeComment = async (event) => {
        event.preventDefault();
        const _id = event.target.dataset.remove;;
        if (activeUser){
            await deleteComment({variables: {
                _id,
                postId
            }});
            const newState = commentState.filter(comment => comment._id !== _id )
            setCommentState([...newState])   
        }
        return;
    }

    const commentToggleHandler = async (event) => {
        // Stop the browser from submitting the form so we can do so with JavaScript
            event.preventDefault();
      
            const commentBlock = event.target.nextElementSibling;
            
            const toggleBtn = event.target
            
            commentBlock.classList.toggle("hidden");
            if (commentBlock.classList.contains("hidden")) {
              toggleBtn.innerHTML = "Show Comments"
            } else {
              toggleBtn.innerHTML = "Hide Comments"
            }
        
          };


return (

<div className="items-center justify-between mt-4">
    <button id="toggle-comments" value="{{post.id}}" onClick={commentToggleHandler} className="text-blue-500 hover:underline">Show Comments</button>
    <div className="hidden" id="comments">
      
        <>
            {commentState ? commentState.map((comment) => {
                return (
                <>
                
                <div className="flex justify-between w-full bg-gray-200 rounded-sm mt-4">
                    <h3 className="italic text-grey-200 text-sm">{comment.user.userName} on {comment.dateCreated}</h3>
                            <div className="flex justify-end w-auto">
                                {comment.user._id === activeUser ? (<button onClick={removeComment} data-remove={comment._id}><img alt="delComment" data-remove={comment._id} src="trash-bin.png" title="Delete Comment"className="w-4 h-4 "></img></button>): ""}
                                {comment.user._id === activeUser ? (<button onClick={editComment} data-edit={comment._id}  className="px-4"><img alt="editComment" data-edit={comment._id} src="edit.png" title="Edit Comment"className="w-4 h-4 "></img></button>): ""}
                                
                            </div>
                            
                </div>
                        
                <p className=" h-auto float-left font-semibold break-words mb-4">{comment.content}</p>
                            
                          
                        
                        
                    
              

                </>    )
            }) :""}
            <div className="mb-4 rounded-full">
                <input type="text" onKeyUpCapture={postComment}  name="comment" id="comment" placeholder="Add a comment!" className="mt-4 w-full px-4 py-3 rounded-full bg-gray-200 mt-2 border focus:border-black focus:bg-white focus:outline-none " />
            </div>
        </>
    </div>
</div>)}

export default Comment;

