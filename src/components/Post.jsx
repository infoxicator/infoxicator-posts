import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import { connect } from 'react-redux';
import { Link } from '@americanexpress/one-app-router';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';

const createMarkup = (markup) => ({ __html: markup });

const BlogPost = ({ post, localeName }) => {
  const currentLocale = localeName.startsWith('es') ? 'es' : 'en';
  return (
    <li className="py-2">
      <Link to={post.slug} className="deco-none">
        <Card body={true} className="ripple">
          <Media>
            <Media.Body>
              <Card.Title>{post.title.rendered}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{dayjs(post.date).locale(currentLocale).format('MMMM DD, YYYY')}</Card.Subtitle>
              <Card.Text>
                <p dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)} />
              </Card.Text>
            </Media.Body>
            {post.better_featured_image && post.better_featured_image.media_details.sizes.thumbnail.source_url
          && (
            <div className="d-none d-sm-block">
              <img
                className="ml-3"
                src={post.better_featured_image.media_details.sizes.thumbnail.source_url}
                alt="Generic placeholder"
              />
            </div>
          )}
          </Media>
        </Card>
      </Link>
    </li>
  );
};

const mapStateToProps = (state) => ({
  localeName: state.getIn(['intl', 'activeLocale']),
});


export default connect(mapStateToProps, null)(BlogPost);
