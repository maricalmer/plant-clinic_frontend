import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Post from './Post';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    allPosts(filter: { descriptionContains: $filter, OR: {titleContains: $filter} }) {
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

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(
    FEED_SEARCH_QUERY
  );
  return (
    <>
      <div className="merriweather p-6 min-h-[calc(100vh-4rem)] h-fit">
        <div className="font-bold text-sm my-16 sm:text-xl md:text-3xl lg:text-6xl lg:my-24 w-fit mx-auto">
          <input
            className="bg-neutral-100 rounded-xl p-3 border-2 border-lime-700 focus:outline-none"
            type="text"
            placeholder="Search for post..."
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <button
            className="text-lime-700 ml-1 sm:ml-2 md:ml-3 lg:ml-4"
            onClick={() =>
              executeSearch({
                variables: { filter: searchFilter }
              })
            }
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
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
    </>
  );
};

export default Search;
