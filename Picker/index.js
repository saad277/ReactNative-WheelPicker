import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

import {ITEM_HEIGHT} from './Constants';
import Picker from './Picker';

const start = 1900;
const values = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start + i;
    return {value, label: `${value}`};
  })
  .reverse();

const PickerDemo = () => {
  const [selected, setSelected] = useState(5);

  const change = (val, index) => {
    console.log('indexxxx->>>>', index);
  };

  const renderItem = (item, index) => {
    const isSelected = Boolean(index === selected);

    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Image
          source={{
            uri: 'https://image.shutterstock.com/image-vector/vector-image-american-flag-260nw-157626554.jpg',
          }}
          style={{
            width: 30,
            height: 20,
            alignSelf: 'center',
            marginHorizontal: 25,
          }}
        />
        <Text style={[styles.label, isSelected && {color: 'black'}]}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What year were you born?</Text>
      <Picker values={values} defaultValue={selected} onChange={change}>
        {renderItem}
      </Picker>
      <Button
        title="Press"
        onPress={() => console.log('state--->', selected)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'SFProText-Semibold',
    fontSize: 24,
    marginBottom: 31,
  },
  label: {
    color: 'gray',
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default PickerDemo;
