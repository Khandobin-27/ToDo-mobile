import React, {useState} from 'react'
import {
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  Animated
} from 'react-native'

export default function Task({ text, deleteTask, id }) {
  const [selected, setSelected] = useState('#ec4f72');
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  function changeColor() {
    if (selected === '#ec4f72') {
      setSelected('#42c871')
    } else {
      setSelected('#ec4f72')
    }
  }

    return (
      <Animated.View style={[styles.button, {transform: [{scale}]}]}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <TouchableOpacity onPress={() => changeColor()}>
              <View style={[styles.square, { backgroundColor: selected }]}></View>
              </TouchableOpacity>
              <Text style={styles.itemText}>{text}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => deleteTask(id)}>
                  <Image source={require('../assets/delete.png')} style={styles.deleteIcon}/>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f3f3f3',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      square: {
        width: 24,
        height: 24,
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 25
      },
      itemText: {
        maxWidth: '80%',
        fontSize: 17
      },
      circular: {
        width: 12,
        height: 12,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 5,
      },
      deleteIcon: {
          width: 22,
          height: 22,
      }
})
