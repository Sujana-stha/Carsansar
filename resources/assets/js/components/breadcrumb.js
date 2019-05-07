// Breadcrumb
import React from 'react'
import { Route, Link } from 'react-router-dom'

const BreadcrumbPageTitle =({match, ...rest}) => {
  return (
    <span>
      {match.isExact? <h4 className="breadcrumbs-title">{match.params.path.replace(/-/g, ' ')}</h4>:null}
      <Route path={`${match.url}/:path`} component={BreadcrumbPageTitle} />
    </span>
  )
}

const Breadcrumbs = () => {
  return(
    <div className="breadcrumbs-wrapper col s12">
      <div className="page-title">
        <Route path='/:path' component={BreadcrumbPageTitle}/>
      </div>
      <ul className='container'>
          <Route path='/:path' component={BreadcrumbsItem} />
      </ul>
    </div>
  )
}
const BreadcrumbsItem = ({ match }) => (
  <span>
      <li className={match.isExact ? 'active breadcrumb' : 'breadcrumb first-item'}>
          <Link to={match.url || ''}>
              {match.params.path.replace(/-/g, ' ')}
          </Link>
      </li>
      <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
  </span>
)
export default Breadcrumbs;