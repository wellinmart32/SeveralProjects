'use strict';

import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import { get } from 'lodash';
import take from 'lodash/array/take';
import isEqual from 'lodash/lang/isEqual';

import getFeaturedImage from 'app/lib/get-featured-image';
import getScrollTrackerMixin from 'app/lib/get-scroll-tracker-mixin';

import Flux from 'app/flux';

import Hero from 'app/components/hero';
import BlogPostListItem from 'app/components/blog-post-list-item';
import BlogControls from 'app/components/blog-controls';
import LoadMoreButton from 'app/components/load-more-button';
import Footer from 'app/components/footer';
import ContactBlock from 'app/components/contact-block';
import ScrollWrapper from 'app/components/scroll-wrapper';

const PageBlog = React.createClass({
  mixins: [getScrollTrackerMixin('blog')],
  getInitialState() {
    return {
      isCategorised: this.props.blogCategory !== 'all',
      isLoadingInitialPosts: true,
      isLoadingMorePosts: false,
      isLoadingCategoryPosts: false
    };
  },
  componentWillMount() {
    if (this.props.posts) {
      this.setState({
        isLoadingInitialPosts: false
      });
    }
  },
  componentWillReceiveProps(nextProps) {
    const { posts: currentPosts, blogCategory: currentBlogCategory } = this.props;
    const { posts: nextPosts, blogCategory: nextBlogCategory } = nextProps;
    const { isLoadingInitialPosts } = this.state;

    if (isLoadingInitialPosts && nextPosts) {
      this.setState({
        isLoadingInitialPosts: false
      });
    }

    // applies when category is changed
    if (currentBlogCategory !== nextBlogCategory) {
      this.setState({
        isLoadingCategoryPosts: true
      });
    }

    // applies when posts from category change have loaded
    // we infer a category change from post IDs as:
    // - can't use props, by this point currentBlogCategory === nextBlogCategory
    // - looping through posts to infer category is less reliable as some posts have multiple
    //   categories, hence in a given category not all the posts will have the same category.
    const currentPostsSample = take(currentPosts, 6).map(post => post.id);
    const nextPostsSample = take(nextPosts, 6).map(post => post.id);
    if (!isEqual(currentPostsSample, nextPostsSample)) {
      this.setState({
        isLoadingCategoryPosts: false,
        isCategorised: currentBlogCategory !== 'all'
      });
    }

    // applies when "load more" button is clicked
    const newPostsAdded = (currentPosts && nextPosts) && (currentPosts.length < nextPosts.length);
    if (newPostsAdded) {
      this.setState({
        isLoadingMorePosts: false
      });
    }
  },
  getPosts() {
    const { isCategorised } = this.state;
    const { postsPagination, postsPaginationTotal } = this.props;
    let { posts } = this.props;
    if (!isCategorised && postsPagination > 1 && postsPagination < postsPaginationTotal) {
      posts = take(posts, (postsPagination * 12) + 1);
    }
    return posts;
  },
  onClickLoadMore() {
    Flux.loadMorePosts();
    this.setState({
      isLoadingMorePosts: true
    });
  },
  renderPosts() {
    const posts = this.getPosts();
    let output;
    if (posts) {
      if (posts.length) {
        output = posts.map((postData, index) => {
          return (
            <BlogPostListItem
              key={postData.slug}
              className="blog-post-list-item"
              featured={!this.state.isCategorised && index === 0}
              data={postData}
            />
          );
        });
      } else {
        output = <h3 className="message">No posts found</h3>;
      }
    }
    return output;
  },
  render() {
    const {
      isCategorised,
      isLoadingInitialPosts,
      isLoadingMorePosts,
      isLoadingCategoryPosts
    } = this.state;
    const { postsPagination, postsPaginationTotal, footer, studios, currentPage,
            documentScrollPosition, viewportDimensions, blogCategory, page,
            posts } = this.props;
    const classes = classnames('page-blog', this.props.className, {
      categorised: isCategorised,
      loading: isLoadingInitialPosts || isLoadingCategoryPosts,
      empty: posts && !posts.length
    });

    return (
      <article className={classes}>
        <Hero
          key="hero"
          title="THINK. MAKE. LEARN."
          eventLabel="ustwo blog"
          showDownIndicator={false}
          notFullScreen={true}
        >
          <BlogControls
            className={classnames({ show: page })}
            blogCategory={blogCategory}
          />
        </Hero>
        <section className="card-list blog-post-list">
          <div className="card-list-inner page-content-wrapper">
            {this.renderPosts()}
          </div>
          <LoadMoreButton
            loading={isLoadingMorePosts}
            onClick={this.onClickLoadMore}
            disabled={postsPagination >= postsPaginationTotal}
          />
        </section>
        <ScrollWrapper
          component={<ContactBlock page={page ? page.slug : 'home'} />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          requireScreenPosition={true}
          className="scroll-wrapper-contact-block"
        />
        <Footer data={footer} studios={studios} currentPage={currentPage}/>
      </article>
    );
  },
});

export default PageBlog;
