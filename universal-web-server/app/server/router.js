import { renderToString } from 'react-dom/server';
import React from 'react';
import { matchPath, StaticRouter } from 'react-router-dom';

import routes from './routes';
import renderFullPage from './renderFullPage';
import getPokemon from '../shared/services/getPokemon';
import App from '../shared/components/App';

export default function router(req, res) {
  const match = routes.reduce(
    (acc, route) => matchPath(req.url, {
      path: route,
      exact: true,
    }) || acc,
    null,
  );
  if (!match) {
    res.status(404).send('page not found');
    return null;
  }
  const context = {};
  renderToString((
    <StaticRouter context={context} location={req.url} >
      <App/>
    </StaticRouter>
  ));
  context.appData.then(()=>{
    const html = renderToString((
      <StaticRouter context={context} location={req.url} >
        <App/>
      </StaticRouter>
    ));
    console.log(html);
    res.status(200).send(renderFullPage(html, context.appData));
  })
}
