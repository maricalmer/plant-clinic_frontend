import React from 'react';
import Post from './Post';
import { useQuery, gql } from '@apollo/client';
import BounceLoader from "react-spinners/BounceLoader";

export const FEED_QUERY = gql`
  {
    allPosts {
      id
      createdAt
      title
      description
      slug
      imageUrl
      postedBy {
        id
        name
      }
      likes {
        id
        user {
          id
          name
        }
      }
      comments {
        id
      }
    }
  }
`;

const PostList = () => {
  const { data, loading } = useQuery(FEED_QUERY);

  if (data) {
    return (
    <div className="h-screen flex flex-col mx-auto">
      <BounceLoader
        color={"#82CB1B"}
        loading={data}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
     </div>
    )
  }

};

export default PostList;
