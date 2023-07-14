import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FETCH_QUERY } from './PostDetails';

const LIKE_MUTATION = gql`
  mutation DestroyLike($id: ID!) {
    destroyLike(id: $id) {
      id
    }
  }
`;

const Dislike = (props) => {
  const [vote] = useMutation(LIKE_MUTATION, {
    variables: {
      id: props.likeId
    },
    refetchQueries: [FETCH_QUERY, "fetchPost"],
  });


  return (
    <div
      className="mr-2 cursor-pointer"
      onClick={vote}
    >
      <FontAwesomeIcon icon={faThumbsDown} />
    </div>
  );
};

export default Dislike;
