/**
 * @format
 * @flow
 */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import type {Node} from 'react';
import {Text, View} from 'react-native';
import {BackButton} from 'react-router-native';

const Home: () => Node = () => {
  return (
    <View>
      <BackButton />

      <Text>Home</Text>
    </View>
  );
};

export default Home;
