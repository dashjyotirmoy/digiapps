import React, { Component } from 'react';
import Velocity from './ProductDefinition/Velocity';
import Quality from './ProductDefinition/Quality';
import Customer from './ProductDefinition/Customer';

const DefinitionLoader = ({ match }) => {
    const currentProduct = match.params.productSelected;
    if (currentProduct === "velocity") return <Velocity />;
    if (currentProduct === "quality") return <Quality />;
    // if (currentProduct === "contact") return <Velocity />;
    if (currentProduct === "customer") return <Customer />;
    return (<div className="w-100 text-center h1 text-danger">
        Definition for PRODUCT not found
    </div>)
}

export default DefinitionLoader;