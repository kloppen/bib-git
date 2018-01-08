// Copyright (C) 2017, Stefan Kloppenborg
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
