import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { createDatabase } from '../utils/database_utils'

export default class BaseScreen extends Component {

  async componentDidMount() {
    this.db = await createDatabase()
  }

  render() {
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingTop: 25
        }}>
            {this.preRender()}
        </SafeAreaView> 
    );
  }

  preRender() {  
    throw new Exception("BaseScreen::preRender error")
  }

}
