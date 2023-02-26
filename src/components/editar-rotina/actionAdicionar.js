import React from 'react';

import add from '../../assets/mais (7).png'

const ActionAdicionar = ({setAddCard, isAddCard, cardType}) => {

    const onClick = () => {
        setAddCard(addCards => addCards+1);
        isAddCard.current = true;
    }
    return(
        <div className={cardType} onClick={onClick}>
            <div className="card-rotina">
                <div className="centro">
                    +
                </div>
            </div>
        </div>
    )
}

export default ActionAdicionar;