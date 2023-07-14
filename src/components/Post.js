import React from 'react';
import { Link } from 'react-router-dom';
import Pluralize from 'pluralize';
import { timeDifferenceForDate } from '../utils/time';

const Post = (props) => {
  const { post } = props;

  return (
    <div className="safari_only mb-4 w-full">
      <Link className="flex items-start bg-neutral-100 rounded-md group cursor-pointer overflow-hidden"  to={`/posts/${post.slug}`}>
        <div className="w-full">
          <div className="h-fit overflow-hidden">
            <img src={post.imageUrl} alt="" className="mx-auto w-full group-hover:scale-105 ease-in-out duration-700"></img>
          </div>
          <div className="py-3 px-6" >
            <div className="font-bold text-xl border-b border-b-orange-200 pb-2">
              {post.title}
            </div>
            <div className="font-light mt-2 border-b border-b-orange-200 pb-2">
              {post.description}
            </div>
            <div className="font-light text-xs mt-2 md:max-lg:block">
              <div className="flex justify-center">
                <div className="mr-1">written by</div>
                <div className="uppercase">{post.postedBy.name}</div>
                <div className="italic mr-1">,</div>
                <div className="italic mr-1">{timeDifferenceForDate(post.createdAt)}</div>
              </div>
              <div className="flex space-x-2 justify-center">
                <div>{Pluralize("like", post.likes.length, true)}</div>
                <div>-</div>
                <div>{Pluralize("comment", post.comments.length, true)}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
