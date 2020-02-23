import React from 'react';

const ClearOne = props=>(<button className="other" 
                                 onClick={props.clearOne}
                                 >{props.value}
                         </button>
                         );

export default ClearOne;