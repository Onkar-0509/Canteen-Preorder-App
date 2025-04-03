import React from 'react';
import { useParams } from 'react-router-dom';
import FoodDisplay from "../FoodDisplay/FoodDisplay";

const FoodList = () => {

    const { foodId } = useParams();  

    return (
        <div>
            <FoodDisplay foodId={foodId} />
        </div>
    );
};

export default FoodList;