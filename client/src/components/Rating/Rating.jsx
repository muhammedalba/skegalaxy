import { Fragment,  } from 'react';

import PropTypes from 'prop-types';
import { IoStarSharp } from "react-icons/io5";



const Rating = ({ ratingsAverage }) =>{
  


  const showRating = [1, 2, 3, 4, 5].map((rating) => {
    return (
      <Fragment key={rating}>
        <IoStarSharp fontSize={'1.3rem'} color={ratingsAverage >= rating?'var( --star-colour)':'var(--btn-bg-color)'} />
      </Fragment>
    );
  }); 

  return (
    <div className=' m-auto py-2'>
      <div className=' w-100 h-100 d-flex align-items-center justify-content-center gap-0 column-gap-2'>
        {showRating}
      </div>
    </div>
  );
};

Rating.propTypes = {
  ratingsAverage: PropTypes.any,
  handleRatings: PropTypes.func,
};

export default Rating;
