import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { parameterize } from '../utils/parameterize';
import { FEED_QUERY } from './PostList';

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      id
      title
      description
      slug
      imageUrl
      createdAt
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

const CreatePost = () => {
  const [image, setImage] = useState("");
  const { loading, error } = useQuery(FEED_QUERY);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: '',
    title: ''
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      description: formState.description,
      title: formState.title
    },
    update: (cache, { data: { createPost } }) => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });
      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          allPosts: [createPost, ...data.allPosts]
        },
      });
    },
    onCompleted: () => {
      navigate("/");
    }
  });

  if (loading) {
    return (<div className="ml-3 mt-5">Loading ...</div>)
  }
  if (error) {
    console.log(error)
  }
  const uploadImage = () => {
    const imageSlug = parameterize(formState.title);
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
    data.append("public_id", imageSlug)
    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .catch(err => console.log(err))
  }

  return (
    <div className="merriweather">
      <div className="p-6 h-fit">
        <div className="font-bold text-6xl my-14">Upload a new post</div>
      </div>
      <div className="text-center">
        <form
          className="p-6 pt-0 h-fit"
          onSubmit={(e) => {
            e.preventDefault();
            createPost();
          }}
        >
          <div className="flex flex-col text-center">
            <input
              className="w-4/5 bg-neutral-100 rounded-xl p-3 border-2 border-lime-700 font-bold text-sm mb-4 mx-auto focus:outline-none sm:text-xl md:text-3xl lg:w-3/5"
              value={formState.title}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  title: e.target.value
                })
              }
              type="text"
              placeholder="A title for the post..."
            />
            <textarea
              className="w-4/5 bg-neutral-100 rounded-xl p-3 border-2 border-lime-700 font-bold text-sm mt-4 mb-14 mx-auto h-48 focus:outline-none sm:text-xl md:text-3xl lg:w-3/5"
              value={formState.description}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  description: e.target.value
                })
              }
              type="text"
              placeholder="The description for the post..."
            />
            <input
              className="w-4/5 mx-auto mb-10 lg:w-3/5"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button className="w-1/5 bg-lime-700 text-lime-300 rounded-md p-2" type="submit" onClick={uploadImage}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
