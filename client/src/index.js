// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';

// Imported components from ./components/file.js.
import { Navbar } from './components/navbar.js';
import { addArticle } from './components/addArticle.js';
import { removeArticle } from './components/removeArticle.js';
import { EditNews } from './components/EditNews.js';
import { frontPage } from './components/frontPage.js';
import { loadPreview } from './components/loadPreview.js';
import { loadArticle } from './components/loadArticle.js';
import { NewsFeed } from './components/newsFeed.js';
import { Footer } from './components/Footer.js';

// End of imported components

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Navbar />
        <Route exact path="/" component={frontPage} />
        <Route path="/home" component={frontPage} />
        <Route path="/category/:category" component={loadPreview} />
        <Route path="/addArticle" component={addArticle} />
        <Route path="/removeArticle" component={removeArticle} />
        <Route path="/editArticle/:id" component={EditNews} />
        <Route exact path="/readArticle/:id" component={loadArticle} />
        <Footer />
      </div>
    </HashRouter>,
    root
  );
