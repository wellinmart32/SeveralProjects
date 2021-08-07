const routes = {
  home: {
    id: 'home',
    patterns: ['/'],
    data: () => [{
      url: 'ustwo/v1/pages/home',
      type: 'page',
      slug: 'home',
      async: ['related_content']
    }]
  },
  aboutUs: {
    id: 'about-us',
    patterns: ['/about-us'],
    data: () => [{
      url: 'ustwo/v1/pages/about-us',
      type: 'page',
      slug: 'about-us'
    }]
  },
  work: {
    id: 'work',
    patterns: ['/work'],
    data: () => [{
      url: 'ustwo/v1/pages/work',
      type: 'page',
      slug: 'work'
    }]
  },
  discoveryStrategy: {
    id: 'about-us/discovery-strategy',
    patterns: ['/about-us/discovery-strategy'],
    data: () => [{
      url: 'ustwo/v1/pages/about-us',
      type: 'page',
      slug: 'discovery-strategy'
    }]
  },
  designBuild: {
    id: 'about-us/design-build',
    patterns: ['/about-us/design-build'],
    data: () => [{
      url: 'ustwo/v1/pages/about-us',
      type: 'page',
      slug: 'design-build'
    }]
  },
  launchScale: {
    id: 'about-us/launch-scale',
    patterns: ['/about-us/launch-scale'],
    data: () => [{
      url: 'ustwo/v1/pages/about-us',
      type: 'page',
      slug: 'launch-scale'
    }]
  },
  changeTransform: {
    id: 'about-us/change-transform',
    patterns: ['/about-us/change-transform'],
    data: () => [{
      url: 'ustwo/v1/pages/about-us',
      type: 'page',
      slug: 'change-transform'
    }]
  },
  auto: {
    id: 'auto',
    patterns: ['/auto'],
    data: () => [{
      url: 'ustwo/v1/pages/auto',
      type: 'page',
      slug: 'auto'
    }]
  },
  humanisingAutonomy: {
    id: 'auto/humanisingautonomy',
    patterns: ['/auto/humanisingautonomy'],
    data: () => [{
      url: 'ustwo/v1/pages/humanisingautonomy',
      type: 'page',
      slug: 'humanisingautonomy'
    }]
  },
  caseStudy: {
    id: 'work/case-study',
    patterns: ['/work/:cid'],
    data: slug => [{
      url: `ustwo/v1/case-studies/${slug}`,
      type: 'caseStudy',
      slug: slug,
      async: ['related_content']
    }]
  },
  blogCategory: {
    id: 'blog',
    patterns: ['/blog?category=:category'],
    data: category => [{
      url: `ustwo/v1/pages/blog`,
      type: 'page',
      slug: 'blog'
    }, {
      url: `ustwo/v1/posts?per_page=12&category=${category}`,
      type: 'posts',
      slug: `posts/${category}`
    }]
  },
  blog: {
    id: 'blog',
    patterns: ['/blog'],
    data: () => [{
      url: 'ustwo/v1/pages/blog',
      type: 'page',
      slug: 'blog'
    }, {
      url: 'ustwo/v1/posts?per_page=12',
      type: 'posts',
      slug: 'posts/all'
    }]
  },
  post: {
    id: 'blog/post',
    patterns: ['/blog/:pid'],
    data: pid => [{
      url: `ustwo/v1/posts/${pid}`,
      type: 'post',
      slug: pid,
      async: ['related_content']
    }]
  },
  eventsStudio: {
    id: 'events',
    patterns: ['/events?studio=:studio'],
    data: studio => [{
      url: `ustwo/v1/pages/events`,
      type: 'page'
    }, {
      url: `ustwo/v1/events?per_page=5&studio=${studio}`,
      type: 'events',
      slug: `events/${studio}`
    }, {
      url: 'ustwo/v1/events?per_page=3&archived=true',
      type: 'archivedEvents'
    }]
  },
  events: {
    id: 'events',
    patterns: ['/events'],
    data: () => [{
      url: 'ustwo/v1/pages/events',
      type: 'page'
    }, {
      url: 'ustwo/v1/events?per_page=5',
      type: 'events',
      slug: 'events'
    }, {
      url: 'ustwo/v1/events?per_page=3&archived=true',
      type: 'archivedEvents'
    }]
  },
  event: {
    id: 'events/event',
    patterns: ['/events/:eid'],
    data: eid => [{
      url: 'ustwo/v1/pages/events',
      type: 'page',
      slug: 'event'
    }, {
      url: `ustwo/v1/events/${eid}`,
      type: 'event',
      slug: eid
    }]
  },
  legal: {
    id: 'legal',
    patterns: ['/legal'],
    data: () => [{
      url: 'ustwo/v1/pages/legal',
      type: 'page',
      slug: 'legal'
    }]
  },
  joinUs: {
    id: 'join-us',
    patterns: ['/join-us', '/join-us/:lid'],
    data: lid => [{
      url: 'ustwo/v1/pages/join-us',
      type: 'page',
      slug: 'join-us'
    }, {
      url: 'ustwo/v1/jobs',
      type: 'jobs'
    }]
  },
  ev: {
    id: 'ev',
    patterns: ['/ev'],
    data: () => [{
      url: 'ustwo/v1/pages/ev',
      type: 'page',
      slug: 'ev'
    }]
  },
  notfound: {
    id: 'notfound',
    pattern: '/404',
    statusCode: 404,
    data: () => []
  },
  contactUs: {
    id: 'contact-us',
    patterns: ['/contact-us'],
    data: () => [{
      url: 'ustwo/v1/pages/contact-us',
      type: 'page',
      slug: 'contact-us'
    }]
  },
};

export default routes;
