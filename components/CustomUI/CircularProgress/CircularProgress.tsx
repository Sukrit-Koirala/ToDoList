import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../../hooks/useTheme';

interface CircularProgressProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  animationDuration?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<CircularProgressProps> = ({
  completed,
  total,
  size = 60,
  strokeWidth = 6,
  color = '#ffffff',
  backgroundColor = '#e0e0e0',
  animationDuration = 800,
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedPercentage = useSharedValue(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const {theme} = useTheme()

  useEffect(() => {
    animatedPercentage.value = withTiming(
      percentage,
      { duration: animationDuration },
      (finished) => {
        if (finished) {
          runOnJS(setDisplayPercentage)(percentage);
        }
      }
    );

    // Update display during animation
    const interval = setInterval(() => {
      runOnJS(setDisplayPercentage)(Math.round(animatedPercentage.value));
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [percentage]);

  const animatedCircleProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (animatedPercentage.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.background}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
          animatedProps={animatedCircleProps}
        />
      </Svg>

      <View style={styles.textContainer}>
        <Text style={[styles.percentageText, { fontSize: size * 0.25, color }]}>
          {displayPercentage}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontWeight: 'bold',
  },
});

export default CircularProgress;