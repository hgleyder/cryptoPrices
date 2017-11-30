import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinsList: [],
  }
}

componentDidMount(){
  this.getCoinsFromApiAsync();
}

getCoinsFromApiAsync =() => {
    return fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({coinsList: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

const contentCoins = () =>
{
 return this.state.coinsList.map(coin =>{
  return (
    <Text>{coin.symbol}</Text>
  );
});
}
    return (
      <View style={styles.container}>
        {contentCoins()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
