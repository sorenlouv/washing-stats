import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'querystring';
import { Link } from 'react-router-dom';

function empty(obj) {
  return Object.keys(obj).reduce((memo, key) => {
    if (obj[key] === null) {
      return memo;
    }

    return { ...memo, [key]: obj[key] };
  }, {});
}

export function toQuery(search) {
  return qs.parse(search.slice(1));
}

export function fromQuery(query) {
  return qs.stringify(query);
}

export function getUrlParam(searchquery, prop, values) {
  const propValue = toQuery(searchquery)[prop];

  if (values.includes(propValue)) {
    return propValue;
  }

  return values[0];
}

// Custom Link component
// Adds support for object based query params.
export function QueryLink({ to = {}, query = {}, ...props }, context) {
  const location = context.router.history.location;
  const currentQuery = toQuery(location.search);
  const nextQuery = empty({
    ...currentQuery,
    ...to.query,
    ...query
  });
  const search = qs.stringify(nextQuery);
  const pathname = to.pathname || location.pathname;

  const isActive = _.isEqual(currentQuery, nextQuery);

  return (
    <Link
      className={isActive ? 'active' : ''}
      {...props}
      to={{ ...to, search, pathname }}
    />
  );
}

QueryLink.contextTypes = {
  router: PropTypes.object
};
