import React, {Component} from 'react';
import { View, StyleSheet, Text,Animated, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

class SideMenu extends Component {
    render() {
        return (
            <Animated.View style={[styles.container, {
                transform: [{
                    translateX: this.props.translateX.interpolate({
                        inputRange: [-width * 0.70, 0],
                        outputRange: [-70, 0]
                    })
                }]
            }]}>
                <View >
                    <Text style={{ fontSize: 25, fontWeight: 'bold',  }}>Welcome to</Text>
                    <Text style={{ fontSize: 35, fontWeight: 'bold',  }}>Sharety</Text>
                </View>
                <View style={styles.separator}></View>
                <View style={{marginBottom:10}}>
                    <Text style={{ fontSize: 15, fontWeight: '100',  color: 'gray' }}>Filter Charitys</Text>
                </View>
                
                <Text style={{ fontSize: 12, fontWeight: '400', marginLeft:10 }}># Favorities</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        paddingLeft:70,
        top:-50
    },
    separator: {
        height:2,
        backgroundColor:'lightgray',
        marginVertical:30,
        width:100,
        borderRadius:6,

    }
});
export default SideMenu;