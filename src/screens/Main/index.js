import React, { Component } from 'react';
import {TouchableWithoutFeedback, StyleSheet, View, TouchableOpacity, Text, Dimensions, Animated, ScrollView } from 'react-native';
import Interactable from 'react-native-interactable';
const { width, height }  = Dimensions.get('window')

import SideMenu from './SideMenu'
import Shadow from '../../Components/Shadow'


export default class HandleRelayout extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
    this._deltaX = new Animated.Value(0);
  }
  onSnapStart = event => {
  console.log('onSnapStart', event);
  };
  onSnap = event => {
    console.log('onSnap', event);
  };
  render() {
    console.log('_deltaX',this._deltaX)
          // this._deltaX.interpolate({
      //     inputRange: [-230, -230, -180, -180],
      //     outputRange: [1, 1, 0, 0]
      //   })

    return (
      <View>
        <Interactable.View
          style={{
            width: width * 1.70,
            height
          }}
          horizontalOnly={true}
          animatedNativeDriver={true}
          gravityPoints={[{x: -width * 0.70, strength: 3000, falloff: 0, damping:0.7 }]}
          animatedValueX={this._deltaX}
          snapPoints={[{x: -width * 0.70},{x: 0}]}>
          <View style={styles.page}>
            <View style={styles.sideMenu}>
              <SideMenu 
                translateX={this._deltaX}
              />
            </View>
            <View style={{flexDirection:'column', flex:1}}>
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={{width,height, alignItems:'center', justifyContent:'center'}}>
                    <Shadow>
                      <View style={styles.card}/>
                    </Shadow>
                </View>
                <View style={styles.card}/>
                <View style={styles.card}/>
               <View style={styles.card}/>
            </ScrollView>
            </View>
          </View>
        </Interactable.View>
        <View style={{position:'absolute', top:30,alignSelf:'center', height:70,width:70,borderRadius:35, backgroundColor:'red'}}></View>
      </View>
      
    );
  }
  onChangeLayoutPress() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  page: {
    width: width * 1.70,
    flex:1,
    flexDirection:'row',
  },
  sideMenu: {
    width: width * 0.70,
    height: 180,
    height,
  },
  mainContent:{
    width,
    alignItems:'center'
  },
  card: {
    width: 300,
    height: 380,
    backgroundColor: '#542790',
    borderRadius: 8,
    marginTop:20
  },
  label: {
    textAlign: 'center',
    fontSize: 24
  }
});