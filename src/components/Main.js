import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView  } from 'react-native';
import getTemperature from '../api/getTemperature';
import {connect} from 'react-redux';
import * as actionCreator from '../redux/actionCreator'

class Main extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          cityName: ''
      }
  }

  getTemperatureDegree = () => {
    const {cityName, temp, isLoading, error} = this.props;
    if (isLoading) return 'Please wait for a minute!';
    if (error) return 'The location is not exist. Please try again!';
    if (!cityName) return 'Please enter the location!';
    return `Temperature in ${cityName} now is ${Math.round(temp)}°C.`

  }

  getTempByCityName = () => {
    const {cityName} = this.state;
    this.props.fetchTemperatureThunk(cityName);
  }

  render(){
    return(
    <ScrollView style={styles.container}>
        <KeyboardAvoidingView
            behavior="padding"
            >
            <TextInput
            underlineColorAndroid="transparent"
            autoCorrect={false}
            keyboardType="visible-password"
            style={styles.place}
            placeholder='Location'
            value={this.state.cityName}
            onChangeText={text => this.setState({ cityName: text })}
            >
            </TextInput>
            <TouchableOpacity
            style={styles.button}
            onPress={() => this.getTempByCityName()}
            >
                <Text style={styles.buttonText}>
                    Search
                </Text>
            </TouchableOpacity>

            <Text style={styles.weatherText}>
                    {this.getTemperatureDegree()}
            </Text>
        </KeyboardAvoidingView>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBDEFB'
  },

  place: {
      backgroundColor: '#EEEEEE',
      borderWidth: 1,
      borderRadius: 5,
      padding: 15,
      margin: 10,
      marginTop: 100,
      justifyContent: 'center',
      fontStyle: 'italic',
      alignItems: 'center',
      fontSize: 17
  },

  button: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 10,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      backgroundColor: '#9575CD'
  },

  buttonText: {
      color: 'white'

  },

  weatherText: {
      fontSize: 40,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
      margin: 50
  }
});

function mapStateToProps(state) {
    return {
        cityName: state.cityName,
        temp: state.temp,
        isLoading: state.isLoading,
        error: state.error
    }
}

export default connect(mapStateToProps, actionCreator)(Main)



