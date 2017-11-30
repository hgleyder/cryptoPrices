import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Title, List, ListItem, Thumbnail, Text, Body } from 'native-base';

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
    return fetch('https://api.coinmarketcap.com/v1/ticker/?limit=40')
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
  <ListItem key={coin.symbol} id={coin.symbol}>
  <Thumbnail square size={80} />
  <Body>
  <Text>{coin.symbol}</Text>
  <Text note>{coin.name}</Text>
  <Text note>${coin["price_usd"]} USD</Text>
  </Body>
  </ListItem>
  );
});
}
    return (
      <Container>
        <Header>
           <Text style={{marginTop: 15, color: 'white', fontSize: 22, fontWeight: '700'}}>Crypto Prices</Text>
          </Header>
        <Content>
          <List>
            {contentCoins()}
          </List>
        </Content>
      </Container>
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
