import React from 'react';
import Post from './Post';
import Message from './Message';
import Flash from './Flash';
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
      <div className="flash fixed bottom-5 right-5 bg-lime-500 rounded-md font-light text-xs ubuntu hidden">
        <Message/>
      </div>
      <div className= "fixed bottom-5 right-5 bg-lime-500 rounded-md font-light text-xs ubuntu">
        <Flash/>
      </div>
    </div>
  );
};

export default PostList;
