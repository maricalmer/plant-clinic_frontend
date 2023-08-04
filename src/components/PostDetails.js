import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Pluralize from 'pluralize';
import Like from './Like';
import Dislike from './Dislike';
import CreateComment from './CreateComment';
import Comment from './Comment';
import { AUTH_TOKEN } from '../utils/constants';
import { timeDifferenceForDate } from '../utils/time';

export const FETCH_QUERY = gql`
  query fetchPost($slug: String!) {
    fetchPost(slug: $slug) {
      id
      title
      description
      imageUrl
      createdAt
      likes {
        id
        user {
          id
        }
      }
      postedBy {
        name
      }
      comments {
        id
        content
        createdAt
        commentedBy {
          name
        }
      }
    }
  }
`;

const PostDetails = () => {
  const { slug } = useParams();
  const { loading, data, error } = useQuery(FETCH_QUERY, { variables: { slug } });
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  if (loading) {
    return (<div className="ml-3 mt-5">Loading ...</div>)
  }

  if (error) {
    console.log(error)
  }

  const displayLikeOrDislike = () => {
    const current_user_id = authToken.substring(authToken.indexOf("/start/") + 7, authToken.lastIndexOf("/end/"));
    const userVote = data.fetchPost.likes.filter(like => like.user.id === current_user_id);
    if (userVote.length) {
      return <Dislike likeId={userVote[0].id} />
    } else {
      return <Like postId={data.fetchPost.id} />
    }
  }

  return (
    <div>
      { data && (
        <>
          <div className="merriweather p-6 min-h-[calc(100vh-4rem)] h-fit">
            <h1 className="font-bold text-4xl mt-12 mb-3">{data.fetchPost.title}</h1>
            <div className="flex mt-3 mb-12 text-lg">
              <div className="mr-1">by</div>
              <div className="italic mr-1">{data.fetchPost.postedBy.name},</div>
              <div className="">{timeDifferenceForDate(data.fetchPost.createdAt)}</div>
            </div>
            <div className="w-full h-fit overflow-hidden lg:w-3/5 lg:mx-auto">
              <img className="rounded-md mx-auto" src={data.fetchPost.imageUrl} alt={data.fetchPost.slug}></img>
            </div>
            <div className="my-6 lg:my-12">
              <div>{data.fetchPost.description}</div>
            </div>
            <div className="flex text-sm">
              {authToken ? (
                displayLikeOrDislike()
              ) : (
                <div
                  className="mr-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </div>
              )}
              <div className="">{Pluralize("like", data.fetchPost.likes.length, true)}</div>
            </div>
            <div className="my-6 bg-neutral-100 rounded-md p-3">
              <div className="text-lg py-2 border-b border-b-[#EDE5D5]">{Pluralize("Comment", data.fetchPost.comments.length, true)}</div>
              {data.fetchPost.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
              {authToken ? (
                <CreateComment postId={data.fetchPost.id} />
              ) : (
                <div className="mt-4">
                  <form>
                    <div className="flex flex-col lg:flex-row">
                      <textarea
                        className="h-20 rounded-md py-1 px-2 bg-neutral-100 border border-lime-800 lg:grow lg:mr-4"
                        type="text"
                        placeholder="Add comment..."
                      />
                        <button className="mt-4 bg-lime-700 text-lime-300 rounded-md p-2 lg:mt-0 lg:h-20" type="submit" onClick={() => { navigate(`/login`) }}>Comment</button>
                    </div>
                  </form>
                </div>
              )
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
