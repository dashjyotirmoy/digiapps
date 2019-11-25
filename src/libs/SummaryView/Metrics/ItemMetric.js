import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircle, faArrowUp, faArrowDown, faTh } from '@fortawesome/free-solid-svg-icons';

const colorClass = {
    red: "text-red",
    orange: "text-orange",
    green: "text-green"
}


const ItemMetric = (props) => {
    const items = props.ItemNameVal.map((item, key) => {
        return (
            <div key={key} className="border border-dark d-inline-block rounded mx-1 w-auto py-2 px-lg-2 px-md-1 px-xl-4 max-w-18">
                <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                    <FontAwesomeIcon className={"font-size-small", "vertical-initial"} style={{ color: "red" }} icon={faArrowUp} />
                    {item.value}
                </p>
                <p className="font-aggegate-sub-text m-0 text-left text-white-50 m-0">
                    <small>
                        {item.name}
                    </small>
                </p>
            </div>)
    }
    )
    return (
        <React.Fragment>
            {items}
        </React.Fragment>
    )
}

export default ItemMetric;