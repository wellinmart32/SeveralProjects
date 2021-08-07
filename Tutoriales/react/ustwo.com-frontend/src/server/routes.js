import browserify from 'browserify';
import babelify from 'babelify';
import aliasify from 'aliasify';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import log from 'app/lib/log';
import bootstrapper from 'server/bootstrapper';

const isomorphic = true;
log('Isomorphic:', isomorphic);
let router = express.Router();

function renderApp(req, res) {
  if (isomorphic) {
    bootstrapper(`${req.protocol}://${req.hostname}${req.originalUrl}`, req.get('Host-API'), `http://${process.env.DOCKER_PROXY_HOST}`)
      .then((state) => {
        try {
          const App = React.createFactory(require('app/components/app'));
          console.log('Rendering HTML to string...');
          const AppString = ReactDOMServer.renderToString(App({
            state: state
          }));
          console.log('...Done');
          const head = Helmet.rewind();
          res
            .status(state.statusCode)
            .render('app', {
              title: head.title.toString(),
              meta: head.meta.toString(),
              link: head.link.toString(),
              state: JSON.stringify(state),
              app: AppString
            });
          console.log('App Rendered');
        } catch (e) {
          console.log(e);
          res.send(e);
        }
      })
      .catch(error => log('server route error', error, error.stack));
  } else {
    res
      .render('app', {
        title: '',
        meta: '',
        link: '',
        state: '""',
        app: ''
      });
  }
}

router.get('/*', renderApp);

export default router;
