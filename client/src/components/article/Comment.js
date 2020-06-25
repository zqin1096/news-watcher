import React, {useEffect} from 'react';
import commentBox from 'commentbox.io';

const Comment = (props) => {
    useEffect(() => {
        const removeCommentBox = commentBox('5713032202158080-proj');
        return () => {
            removeCommentBox();
        }
    }, []);

    // Change the box ID to be a unique ID.
    return (
        <div className="commentbox" id={props.id}/>
    );
};

export default Comment;