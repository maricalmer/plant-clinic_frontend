import React from 'react';
import Post from './Post';
import { useQuery, gql } from '@apollo/client';

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

  if (loading) {
    return (<div>LOADING ...</div>)
  }

  return (
    <div className="merriweather p-6 min-h-[calc(100vh-4rem)] h-fit">
      <div className="font-bold text-6xl my-14">Recent posts</div>
      <ul className="gap-8 columns-1 sm:columns-2 md:columns-3 lg:columns-4">
        {data && (
          <>
            {data.allPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default PostList;
