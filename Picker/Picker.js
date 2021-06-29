import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  interpolateNode,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
} from 'react-native-reanimated';
import {useValue, translateZ} from 'react-native-redash';

import GestureHandler from './GestureHandler';
import {VISIBLE_ITEMS, ITEM_HEIGHT} from './Constants';

const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

const Picker = props => {
  const {
    values,
    defaultValue = 0,
    children = null,
    onChange = () => {},
  } = props;

  const translateY = useValue(defaultValue);

  const renderList = () => (
    <Animated.View style={{transform: [{translateY}]}}>
      {values.map((v, index) => {
        const y = interpolateNode(
          divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
          {
            inputRange: [index - RADIUS_REL, index, index + RADIUS_REL],
            outputRange: [-1, 0, 1],
            extrapolate: Extrapolate.CLAMP,
          },
        );
        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
        return (
          <Animated.View
            key={v.value}
            style={[
              styles.item,
              {
                transform: [
                  {perspective},
                  {rotateX},
                  translateZ(perspective, z),
                ],
              },
            ]}>
            <View>{children(v.label, index)}</View>
          </Animated.View>
        );
      })}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {renderList()}
      <View style={StyleSheet.absoluteFill}>
        <View
          style={{
            borderColor: 'grey',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            top: ITEM_HEIGHT * 2,
            height: ITEM_HEIGHT,
          }}
        />
      </View>
      <GestureHandler
        values={values}
        max={values.length}
        value={translateY}
        onValueChange={(value, index) => onChange(value, index)}
        defaultValue={defaultValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
});

export default Picker;
