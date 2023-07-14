import React from 'react';
import { timeDifferenceForDate } from '../utils/time';

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="text-sm font-light ml-2 my-4 pl-1 border-l-4 border-l-lime-800">
      <div className="flex">
        <div className="mr-1 font-bold">{comment.commentedBy.name}</div>
        <div className="mr-1">•</div>
        <div className="italic">{timeDifferenceForDate(comment.createdAt)}</div>
      </div>
      <div>{comment.content}</div>
    </div>
  );
};

export default Comment;

