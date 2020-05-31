import React from 'react';
import { configureIguazuSSR } from 'iguazu-holocron';
import { connectAsync } from 'iguazu';
import { withRouter } from '@americanexpress/one-app-router';
import { compose } from 'redux';
import { queryProcedureResult } from 'iguazu-rpc';
import PostsList from './PostsList';
import LoadingSkeleton from './LoadingSkeleton';
import reducer from '../duck';
import './Posts.scss';

const InfoxicatorPosts = ({
  isLoading, loadedWithErrors, posts, postTitle, router: { location: { pathname } },
}) => {
  if (isLoading()) return <LoadingSkeleton />;
  if (loadedWithErrors()) return <h1>Something went wrong...</h1>;
  return (
    <PostsList posts={posts} postTitle={postTitle} filter={pathname.replace(/\//g, '')} />
  );
};

export const loadDataAsProps = ({ store: { dispatch } }) => {
  const apiUrl = 'https://www.infoxication.net/wp-json/wp/v2/posts/';
  return {
    posts: () => dispatch(queryProcedureResult({ procedureName: 'readPosts', args: { api: apiUrl } })),
  };
};

loadDataAsProps.ssr = true;
InfoxicatorPosts.loadDataAsProps = loadDataAsProps;

if (!global.BROWSER) {
  InfoxicatorPosts.loadModuleData = configureIguazuSSR;
}

InfoxicatorPosts.holocron = {
  name: 'infoxicator-posts',
  reducer,
};

export default compose(
  connectAsync({ loadDataAsProps }),
  withRouter
)(InfoxicatorPosts);
