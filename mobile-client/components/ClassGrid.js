import React from 'react';
import { View, Text } from 'react-native';
import ClassIcon from './Class';

function ClassGrid({ navigation, classes, mode }) {
  if (classes.length > 0) {
    return (
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          { classes.map(c => (
            <ClassIcon
              key={c._id}
              navigation={navigation}
              classId={c._id}
              className={c.className}
              mode={mode}
            />
          ))}
      </View>
    );
  }

  return (
    <Text>
      <Text>Join a Class First</Text>
    </Text>
  );
}

export default ClassGrid;
