import { Fragment,  } from 'react';
import './Rating.css';
import PropTypes from 'prop-types';


const Rating = ({ ratingsAverage }) =>{
  
const handleRatings = (rating) => {
  console.log("Selected rating:", rating);
};

  const showRating = [1, 2, 3, 4, 5].reverse().map((rating) => {
    return (
      <Fragment key={rating}>
        <input
        
          checked={parseInt(ratingsAverage) === rating}
          value={rating}
          className='d-none rating-input'
          type='radio'
          name={`stars-${ratingsAverage}`} // تعديل هنا لتفادي تداخل القيم
          id={`star-${ratingsAverage}-${rating}`} // تعديل هنا لتفادي تداخل القيم
          onChange={ (e) => handleRatings(e.target.value)
         }
        />
        <label style={{width:'20px'}} className='' htmlFor={`star-${ratingsAverage}-${rating}`}>
          <div
          className='star-stroke w-100 h-100 '
           style={{backgroundColor:parseInt(ratingsAverage) >= rating?
          ' var(--btn-bg-color)':' var(--secondary-colour)',
          display:'grid' , placeItems:'center'
          ,clipPath:' polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}} >




            <div 
              className='star-fill' 
              style={{width:'70%',
                backgroundColor:parseInt(ratingsAverage) >= rating?
               ' var(--btn-bg-color)':'var(--primary-colour)',
                clipPath:'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                aspectRatio:'1',
            }}
             />
          </div>
        </label>
      </Fragment>
    );
  }); 

  return (
    <div className='stars m-auto py-2'>
      <div className='container__items w-100 h-100 d-flex align-items-center justify-content-center gap-0 column-gap-2'>
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
