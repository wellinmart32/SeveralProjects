'use strict';

import React from 'react';
import { get } from 'lodash';
import map from 'lodash/collection/map';
import take from 'lodash/array/take';
import classnames from 'classnames';
import isEqual from 'lodash/lang/isEqual';
import isEmpty from 'lodash/lang/isEmpty';
import Flux from 'app/flux';
import Hero from 'app/components/hero';
import Video from 'app/components/video';
import SVG from 'app/components/svg';
import EventsControls from 'app/components/events-controls';
import EventsListItem from 'app/components/events-list-item';
import ArchivedEventsListItem from 'app/components/events-archived-list-item';
import LoadMoreButton from 'app/components/load-more-button';
import LoadingIcon from 'app/components/loading-icon';
import getFeaturedImage from 'app/lib/get-featured-image';
import Footer from 'app/components/footer';
import ContactBlock from 'app/components/contact-block';
import ScrollWrapper from 'app/components/scroll-wrapper';

const PageEvents = React.createClass({
  getInitialState() {
    return {
      isFilteredByStudio: this.props.eventsStudio !== 'all',
      isLoadingInitialEvents: true,
      isLoadingMoreEvents: false,
      isLoadingMoreArchivedEvents: false,
      isLoadingStudioEvents: false
    };
  },
  componentWillMount() {
    if (this.props.events) {
      this.setState({
        isLoadingInitialEvents: false
      });
    }
  },
  componentWillReceiveProps(nextProps) {
    const { events: currentEvents, archivedEvents: currentArchivedEvents, eventsStudio: currentEventsStudio } = this.props;
    const { events: nextEvents, archivedEvents: nextArchivedEvents, eventsStudio: nextEventsStudios } = nextProps;
    const { isLoadingInitialEvents } = this.state;

    if (isLoadingInitialEvents && nextEvents) {
      this.setState({
        isLoadingInitialEvents: false
      });
    }

    // applies when studio is changed
    if (currentEventsStudio !== nextEventsStudios) {
      this.setState({
        isLoadingStudioEvents: true
      });
    }

    const currentEventsSample = take(currentEvents, 6).map(event => event.id);
    const nextEventsSample = take(nextEvents, 6).map(event => event.id);

    if (isEmpty(currentEventsSample, nextEventsSample) || !isEqual(currentEventsSample, nextEventsSample)) {
      this.setState({
        isLoadingStudioEvents: false,
        isFilteredByStudio: currentEventsStudio !== 'all'
      });
    }

    const newEventsAdded = (currentEvents && nextEvents) && (currentEvents.length < nextEvents.length);
    if (newEventsAdded) {
      this.setState({
        isLoadingMoreEvents: false
      });
    }

    const archivedEventsAdded = (currentArchivedEvents && nextArchivedEvents) && (currentArchivedEvents.length < nextArchivedEvents.length);
    if(archivedEventsAdded) {
      this.setState({
        isLoadingMoreArchivedEvents: false
      });
    }
  },
  onClickLoadMoreEvents() {
    Flux.loadMoreEvents();
    this.setState({
      isLoadingMoreEvents: true
    });
  },
  getEvents() {
    const { eventsPagination, eventsPaginationTotal } = this.props;
    let { events } = this.props;
    if (eventsPagination > 1 && eventsPagination < eventsPaginationTotal) {
      events = take(events, (eventsPagination * 12) + 1);
    }
    return events;
  },
  onClickLoadMoreArchivedEvents() {
    Flux.loadMoreArchivedEvents();
    this.setState({
      isLoadingMoreArchivedEvents: true
    });
  },
  getArchivedEvents() {
    const { archivedEvents } = this.props;
    return archivedEvents;
  },
	renderEvents() {
    const events = this.getEvents();
    let output;
    if (events) {
      if (events.length) {
        output = events.map((eventData, index) => {
          return (
            <EventsListItem
              className="events-list"
              featured={index === 0}
              data={eventData}
              key={eventData.slug}
            />
          );
        });
      } else {
        output = (
          <div className="no-events-found">
            <h2>Soz, No Talky</h2>
            <p>We don't have any events on the horizon right now. If you're interested in hosting an event,
            <br />or giving a talk - <a href="mailto:events@ustwo.com">let us know! </a></p>
            <SVG
              className="flying-cow"
              spritemapID="flyingCow"
            />
          </div>
        );
      }
    }
    return output;
  },
  renderArchivedEvents() {
    const archivedEvents = this.getArchivedEvents();
    let output, events;
    if (archivedEvents) {
      if (archivedEvents.length) {
        events = archivedEvents.map(archivedEventData => {
          return (
            <ArchivedEventsListItem
              className='archived-events-list'
              data={archivedEventData}
              key={archivedEventData.slug}
            />
          );
        });
        output = (
          <div className='archived-events'>
            <h2 className='sub-title'>Previous Talkies</h2>
            <hr className='rule' />
            <section className='card-list'>
              <div className="card-list-inner">
                {events}
              </div>
            </section>
          </div>
        );
      }
    }
    return output;
  },
  render() {
    const {
      isFilteredByStudio,
      isLoadingInitialEvents,
      isLoadingMoreEvents,
      isLoadingMoreArchivedEvents,
      isLoadingStudioEvents
    } = this.state;
		const {
      page,
      currentParams,
      events,
      archivedEvents,
      studios,
      eventsPagination,
      eventsPaginationTotal,
      archivedEventsPagination,
      archivedEventsPaginationTotal,
      currentPage,
      footer,
      documentScrollPosition,
      viewportDimensions } = this.props;
    const classes = classnames('page-events', this.props.className, {
      loading: isLoadingInitialEvents || isLoadingStudioEvents
    });
    const image = getFeaturedImage(page);

    return (
      <article className={classes}>
      	<Hero
  	      title="Talky Time"
          eventLabel="ustwo events"
          subheading={get(page, 'hero.attr.subheading.value')}
          notFullScreen={true}
        ></Hero>
        <section className="card-list events-list">
          <div className="card-list-inner">
            {this.renderEvents()}
          </div>
          <LoadMoreButton
            loading={isLoadingMoreEvents}
            onClick={this.onClickLoadMoreEvents}
            disabled={eventsPagination >= eventsPaginationTotal}
          />
  		  </section>
        {this.renderArchivedEvents()}
        <LoadMoreButton
          loading={isLoadingMoreArchivedEvents}
          onClick={this.onClickLoadMoreArchivedEvents}
          disabled={archivedEventsPagination >= archivedEventsPaginationTotal}
        />
        <ScrollWrapper
          component={<ContactBlock page="events" />}
          documentScrollPosition={documentScrollPosition}
          viewportDimensions={viewportDimensions}
          requireScreenPosition={true}
          className="scroll-wrapper-contact-block"
        />
        <Footer data={footer} studios={studios} currentPage={currentPage}/>
      </article>
    );
	}
});

export default PageEvents;
