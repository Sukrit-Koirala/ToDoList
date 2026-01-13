import React from 'react';
import { View, ViewStyle, StyleProp, DimensionValue } from 'react-native';

type LineProps = {
  width?: number | string;    // pixels or % string
  thickness?: number;         // height of the line
  color?: string;
  style?: StyleProp<ViewStyle>; // extra styles
};

const Line: React.FC<LineProps> = ({
  width = '100%',
  thickness = 1,
  color = '#101010',
  style,
}) => {
  const lineStyle: ViewStyle = {
    width: width as DimensionValue,       
    height: thickness as DimensionValue,
    backgroundColor: color,
  };

  return <View style={[lineStyle, style]} />;
};

export default Line;
