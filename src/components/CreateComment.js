import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { FETCH_QUERY } from './PostDetails';

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      id
      content
      createdAt
      commentedBy {
        id
        name
      }
    }
  }
`;

const CreateComment = (props) => {
  const [formState, setFormState] = useState({
    content: ''
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId: props.postId,
      content: formState.content
    },
    refetchQueries: [FETCH_QUERY, "fetchPost"]
  });

  return (
    <div className="mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createComment();
          setFormState({
            ...formState,
            content: ""
          })
        }}
      >
        <div className="flex flex-col lg:flex-row">
          <textarea
            className="h-20 rounded-md py-1 px-2 bg-neutral-100 border border-lime-800 lg:grow lg:mr-4"
            value={formState.content}
            onChange={(e) =>
              setFormState({
                ...formState,
                content: e.target.value
              })
            }
            type="text"
            placeholder="Add comment..."
          />
          <button className="mt-4 bg-lime-700 text-lime-950 rounded-md p-2 lg:mt-0 lg:h-20" type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
