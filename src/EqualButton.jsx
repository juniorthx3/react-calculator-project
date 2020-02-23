import React from 'react';

const EqualButton = props=>(<button className="specialButton other" 
                                    id={props.id} 
                                    onClick={props.handleClick}
                                    >{props.value}
                            </button>
                            );
export default EqualButton;