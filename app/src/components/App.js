import React, { Component } from 'react';
import { Container } from 'reactstrap';
import moment from 'moment';
import './App.css';
import AppHeader from './AppHeader';
import Keyboard from './Keyboard';
import RoundPicker from './RoundPicker';
import NumberList from './NumberList.jsx';
import firebase from '../services/firebase';

const round = date => moment(date).format('DD MMM HH:mm');

class App extends Component {
  constructor() {
    super();
    this.round = round(new Date());
    this.state = { numbers: [] };
    this.numberSent = this.numberSent.bind(this);
    this.roundSelected = this.roundSelected.bind(this);
  }

  numberSent(number) {
    firebase.database().ref(this.round).push(number);
    this.setState((prevState) => {
      const newNumbers = prevState.numbers.slice();
      newNumbers.push(number);
      return {
        numbers: newNumbers,
      };
    });
  }

  roundSelected(date) {
    this.round = round(date);
    this.setState({ numbers: [] });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <AppHeader />
          <RoundPicker onRoundSelected={this.roundSelected} />
          <Keyboard onSave={this.numberSent} />
          <NumberList numbers={this.state.numbers}/>
        </Container>
      </div>
    );
  }
}

export default App;
