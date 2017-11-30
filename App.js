import React from 'react';
import { StyleSheet, Dimensions,View } from 'react-native';
import { Container, Header, Content, Title, List, ListItem, Thumbnail, Spinner, Item, Input, Text, Body } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        backgroundColor: "#19B5FE",
      coinsList: [],
        coins: [],
        text: "",
  }
}

componentDidMount(){
  this.getCoinsFromApiAsync();
}

getCoinsFromApiAsync =() => {
    return fetch('https://api.coinmarketcap.com/v1/ticker')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({coins: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

const contentCoins = () =>
{
 return this.state.coins.map(coin =>{
    if(this.state.text!== "" && coin["name"].toLowerCase().indexOf(this.state.text.toLowerCase()) !== -1) {
        return (
                    <ListItem key={coin.symbol} id={coin.symbol}>
                        <Body>
                        <Text>{coin.symbol}</Text>
                        <Text note style={{fontSize: 18}}>{coin.name}</Text>
                        <View style={{flexDirection: "row", flex: 1}}>
                            <Text note style={{color: "#1E8BC3"}}>${coin["price_usd"]} USD</Text>
                            <Text note style={{color: "#1E8BC3"}}>{coin["price_btc"]} BTC</Text>
                        </View>
                        <Text note>Percent Change:</Text>
                        <View style={{flexDirection: "row", flex: 1}}>
                            <Text note
                                  style={{color: parseFloat(coin["percent_change_1h"]) > 0 ? "#279b50" : "#c3233f"}}>{coin["percent_change_1h"]}%
                                1h</Text>
                            <Text note
                                  style={{color: parseFloat(coin["percent_change_24h"]) > 0 ? "#279b50" : "#c3233f"}}>{coin["percent_change_24h"]}%
                                24h</Text>
                            <Text note
                                  style={{color: parseFloat(coin["percent_change_7d"]) > 0 ? "#279b50" : "#c3233f"}}>{coin["percent_change_7d"]}%
                                7d</Text>
                        </View>
                        </Body>
                    </ListItem>
                    )
            }
     else if(this.state.text === "") {
         return (
             <ListItem key={coin.symbol} id={coin.symbol}>
                 <Body>
                 <Text>{coin.symbol}</Text>
                 <Text note style={{fontSize: 18}}>{coin.name}</Text>
                 <View style={{flexDirection: "row", flex: 1}}>
                     <Text note style={{color: "#1E8BC3"}}>${coin["price_usd"]} USD</Text>
                     <Text note style={{color: "#1E8BC3"}}>{coin["price_btc"]} BTC</Text>
                 </View>
                 <Text note>Percent Change:</Text>
                 <View style={{flexDirection: "row", flex: 1}}>
                     <Text note
                           style={{color: parseFloat(coin["percent_change_1h"]) > 0 ? "#279b50" : "#c3233f"}}>{coin["percent_change_1h"]}%
                         1h</Text>
                     <Text note
                           style={{color: parseFloat(coin["percent_change_24h"]) > 0 ? "#279b50" : "#c3233f"}}>{coin["percent_change_24h"]}%
                         24h</Text>
                     <Text note
                           style={{color: parseFloat(coin["percent_change_7d"]) > 0 ? "#279b50" : "#c3233f"}}>{coin["percent_change_7d"]}%
                         7d</Text>
                 </View>
                 </Body>
             </ListItem>
         )
     }
    return null;
})};

    return (
      <Container>
        <Header style={{backgroundColor:this.state.backgroundColor}}>
           <Text style={{marginTop: 15, color: 'white', fontSize: 22, fontWeight: '700'}}>Crypto Prices</Text>
          </Header>
        <Content>
            {this.state.coins.length?
                <View>
                <Item regular>
                    <Input placeholder='Filter Coins' onChangeText={(text) => {this.setState({text:text})}}
                           placeholderTextColor={"gray"}
                           value={this.state.text}/>
                </Item>
                <List>
                    {contentCoins()}
                </List>
                </View>
                :
                <Spinner color='#1E8BC3' />
            }
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
