import React from "react";

import { NavLink } from "react-router-dom";

const Button = ({titulo, type, url, ...props}) => {
    return(
        <>
            {type === 'simple'  && <button {...props}>{titulo}</button>}
            {(type === 'link' && url) &&
            <button {...props}>
                <NavLink to={url}>{titulo}</NavLink>    
            </button>
            }
        </>
        
        
    )
}

Button.defaultProps = {
    url: null,
    type: 'simple'
}
export default Button;