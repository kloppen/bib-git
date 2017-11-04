import React from 'react'
import PropTypes from 'prop-types'
import Reference from './Reference'

const ReferenceList = ({references, library, visibilityFilter}) => (
  <span>
    <span>
      {
        library.hasFailed
          ? (<div className="Error">Failed to retrieve library. Is the backend server running?</div>)
          : (<span/>)
      }
    </span>
    <span>
      {
        library.hasFailedCitationStyleList
          ? (<div className="Error">Failed to retrieve citation style list.</div>)
          : (<span/>)
      }
    </span>
    <span>
      {
        library.hasFailedCitationLocale
          ? (<div className="Error">Failed to retrieve citation locale.</div>)
          : (<span/>)
      }
    </span>
    <span>
      {
        library.isFetching
          ? (<div>Retrieving Library...</div>)
          : (
            <div>
              {references.map(reference => (
                <Reference
                  key={reference.id}
                  reference={reference}
                  hrefRoot={library.hrefRoot}
                  visibilityFilter={visibilityFilter}
                />
              ))}
            </div>
          )
      }
    </span>
  </span>
);

ReferenceList.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  library: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  visibilityFilter: PropTypes.string.isRequired
};

export default ReferenceList
