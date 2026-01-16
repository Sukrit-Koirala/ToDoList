import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type RoundedRectangleProps = {
  children?: ReactNode;
  backgroundColor?: string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
  children,
  backgroundColor = '#6C5CE7',
  radius = 4,
  style,
}) => {
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor,
          borderRadius: radius,
        },
        style,
      ]}
    >
        {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'visible',
  },
});

export default RoundedRectangle;
