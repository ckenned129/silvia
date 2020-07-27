import React, { Component } from 'react';

import '../node_modules/react-vis/dist/style.css';
import {FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';

const SeriesPlot = ({data}) => (
  <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
    <FlexibleWidthXYPlot height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <LineSeries data={data.map((d, i) => ({'x': i, 'y': d}))} />
    </FlexibleWidthXYPlot>
    <p>Last Recorded Value: {data[data.length - 1]}</p>
  </div>
);

export default SeriesPlot;
