import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FETCH_QUERY } from './PostDetails';

const LIKE_MUTATION = gql`
  mutation CreateLike($postId: ID!) {
    createLike(postId: $postId) {
      id
    }
  }
`;

const Like = (props) => {
  const [vote] = useMutation(LIKE_MUTATION, {
    variables: {
      postId: props.postId
    },
    refetchQueries: [FETCH_QUERY, "fetchPost"]
  });


  return (
    <div
      className="mr-2 cursor-pointer"
      onClick={vote}
    >
      <FontAwesomeIcon icon={faThumbsUp} />
    </div>
  );
};

export default Like;
