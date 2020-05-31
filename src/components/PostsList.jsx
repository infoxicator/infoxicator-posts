/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import BlogPost from './Post';

const PostsList = ({ posts, postTitle, filter }) => (
  <React.Fragment>
    { postTitle && (<h2 className="title">{ postTitle }</h2>)}
    <ul className="list-unstyled">
      { posts.filter((post) => post.slug !== filter).map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </ul>
  </React.Fragment>
);

PostsList.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.shape({ rendered: PropTypes.string }),
    date: PropTypes.string,
    excerpt: PropTypes.shape({ rendered: PropTypes.string }),
    better_featured_image: PropTypes.shape({ source_url: PropTypes.string }),
  }).isRequired,
};

export default PostsList;
