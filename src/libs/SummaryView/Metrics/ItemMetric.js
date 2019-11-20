import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircle, faArrowUp, faArrowDown, faTh } from '@fortawesome/free-solid-svg-icons';

const colorClass = {
    red: "text-red",
    orange: "text-orange",
    green: "text-green"
}


const ItemMetric = (props) => {
    const itemMetrics = [
        { name: "Av Released Cycle", value: "25D", icon: faArrowUp, iconColor: "red" },
        { name: "Av Deployment Lead Time", value: "35D", icon: faCircle, iconColor: "green" },
        { name: "Av MTTD", value: "2D", icon: faArrowDown, iconColor: "orange" },
        { name: "Av MTTR", value: "6D", icon: faArrowDown, iconColor: "red" },
        { name: "Av Customer", value: "8", icon: faCircle, iconColor: "orange" },
    ]

    const addClass = (base, type) => {
        const baseClass = [...base]
        baseClass.push(colorClass[type]);
        return baseClass.join(' ');
    }
    const fontStyle = ["font-size-small", "vertical-initial"];
    const items = itemMetrics.map((item, key) => {
        return (
            <div key={key} className="border border-dark d-inline-block rounded mx-1 w-auto py-2 px-lg-2 px-md-1 px-xl-4 max-w-18">
                <p className="font-aggegate-main-text m-0 text-left text-black m-0">
                    <FontAwesomeIcon className={addClass(fontStyle, item.iconColor)} icon={item.icon} />
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