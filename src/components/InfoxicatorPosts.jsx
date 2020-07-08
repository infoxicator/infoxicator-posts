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

export const loadDataAsProps = ({ store: { dispatch, getState } }) => {
  const localeName = getState().getIn(['intl', 'activeLocale']);
  const categoryId = localeName.startsWith('es') ? 23 : 22;
  return {
    posts: () => dispatch(queryCollection({ resource: 'posts', id: categoryId })),
  };
};

loadDataAsProps.ssr = true;

export default compose(
  connectAsync({ loadDataAsProps }),
  withRouter
)(InfoxicatorPosts);
