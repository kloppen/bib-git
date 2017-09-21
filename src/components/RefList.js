import React from 'react'
import PropTypes from 'prop-types'
import Ref from './Ref'

const RefList = ({refs, onRefClick}) => (
  <div>
  {refs.map(ref => (
    <Ref key={ref.id} {...ref} />
  ))}
  </div>
);

RefList.propTypes = {
  refs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onRefClick: PropTypes.func.isRequired
};

export default RefList
