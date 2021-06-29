import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useCode,
  set,
  Value,
  call,
  add,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {usePanGestureHandler} from 'react-native-redash';

import {ITEM_HEIGHT} from './Constants';
import {withDecay} from './AnimationHelpers';

const GestureHandler = props => {
  const {
    value,
    values,
    max,
    defaultValue = 0,
    onValueChange = () => {},
  } = props;

  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const snapPoints = new Array(max).fill(0).map((_, i) => i * -ITEM_HEIGHT);

  const translateY = withDecay({
    value: translation.y,
    velocity: velocity.y,
    state,
    snapPoints,
    offset: new Value(-ITEM_HEIGHT * defaultValue),
  });

  useCode(() => [set(value, add(translateY, ITEM_HEIGHT * 2))], []);

  useCode(() => {
    return call([translateY], ([currentValue]) => {
      const selectedIndex = Math.round(-currentValue / ITEM_HEIGHT);
      const newValue = values[selectedIndex]?.value;

      if (onValueChange && newValue) {
        onValueChange(newValue, Math.abs(selectedIndex));

        console.log("index--->",selectedIndex)
      }
    });
  }, [translateY]);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
