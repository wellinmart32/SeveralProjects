import React from 'react';
import classnames from 'classnames';
import find from 'lodash/collection/find';
import kebabCase from 'lodash/string/kebabCase';
import StudioBlock from 'app/components/studio-block';
import Flux from 'app/flux';
import JobItem from 'app/components/job-item';
import Rimage from 'app/components/rimage';

const StudioJobs = React.createClass({
  getInitialState() {
    return {
      selectedJob: null
    }
  },
  renderJobsList() {
    const { jobs, studio, contactEmail } = this.props;
    let list;
    if (jobs.length) {
      list = (
        <ul className="jobs-list">
          {jobs.map(this.renderJobItem)}
        </ul>
      );
    } else {
      list = (
        <div className="jobs-none">
          <p>We don’t have any specific openings at the moment, but we’re always on the lookout for talented individuals to join the ustwo family. If that’s you, let us know.</p>
          <a
            style={{backgroundColor: studio.color}}
            href={contactEmail.length ? `${contactEmail}?subject=${studio.name} Jobs` : ''}
          >
            Get in touch
          </a>
        </div>
      );
    }
    return list;
  },
  renderJobItem(job) {
    return (
      <JobItem
        key={`job-${job.shortcode}`}
        job={job}
        colour={this.getStudioColour(job)}
        open={this.state.selectedJob === job.shortcode}
        onClick={this.generateOnClickJobItemHandler(job)}
      />
    );
  },
  generateOnClickJobItemHandler(job) {
    return () => {
      const jid = job.shortcode;
      if (this.state.selectedJob === jid) {
        this.setState({ selectedJob: null });
      } else {
        this.setState({ selectedJob: jid });
        Flux.getJobDetails(jid);
      }
    }
  },
  getStudioColour(job) {
    const { studios } = this.props;
    let studio = find(studios, 'name', job.location.city);
    if(!studio) {
      studio = find(studios, 'name', 'London');
    }
    return studio.color;
  },
  render() {
    const { studio, selected } = this.props;
    const id = kebabCase(studio.name);
    const classes = classnames('studio-jobs', `${id}-jobs`, {
      selected: selected
    });

    return (
      <div className={classes}>
        <div className="tab-content" id={`tab-content-${id}`}>
          <StudioBlock studio={studio} />
          {this.renderJobsList()}
        </div>
      </div>
    );
  }
});

export default StudioJobs;
