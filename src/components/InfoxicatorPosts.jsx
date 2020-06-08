import React from 'react';
import { configureIguazuSSR } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import { withRouter } from '@americanexpress/one-app-router';
import { compose } from 'redux';
import { queryCollection } from 'iguazu-rest';
import PostsList from './PostsList';
import LoadingSkeleton from './LoadingSkeleton';
import './Posts.scss';

const InfoxicatorPosts = ({
  isLoading, loadedWithErrors, posts, postTitle, location: { pathname },
}) => {
  if (isLoading()) return <LoadingSkeleton />;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <PostsList posts={posts} postTitle={postTitle} filter={pathname.replace(/\//g, '')} />
  );
};

InfoxicatorPosts.holocron = {
  name: 'infoxicator-posts',
  loadModuleData: async ({ store, module, ownProps }) => {
    await configureIguazuSSR({ store, module, ownProps });
  },
};

export const loadDataAsProps = ({ store: { dispatch } }) => ({
  posts: () => dispatch(queryCollection({ resource: 'posts', id: 'test' })),
});

loadDataAsProps.ssr = true;

export default compose(
  connectAsync({ loadDataAsProps }),
  withRouter
)(InfoxicatorPosts);
