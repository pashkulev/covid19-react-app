import React from 'react';

import CoviDoc from '../CoviDoc/CoviDoc';
import BarPlot from '../BarPlot/BarPlot';

const PlotsContainer = () => {
    return (
        <main>
            <CoviDoc />
            <BarPlot />
          </main>
    );
};

export default PlotsContainer;