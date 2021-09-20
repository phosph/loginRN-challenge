import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStore} from '@store/index';

const LoadingIndicator = observer(() => {
  const winDim = useWindowDimensions();
  const {misc} = useStore();
  if (!misc.isLoading) return null;
  return (
    <View
      style={[styles.container, {width: winDim.width, height: winDim.height}]}>
      <ActivityIndicator size="large" />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    position: 'absolute',
    backgroundColor: '#0005',
    top: 0,
    left: 0,
    justifyContent: 'center',
  },
});

export default LoadingIndicator;
