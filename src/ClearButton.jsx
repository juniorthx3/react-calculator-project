import React from 'react';

const ClearButton = props=>(<button className="specialButton other" 
                                    id={props.id} 
                                    onClick={props.clearAll}
                            >{props.value}
                            </button>
                          );

export default ClearButton;