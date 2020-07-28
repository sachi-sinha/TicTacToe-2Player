import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.X  = <Icon name="close" style={styles.tileX}/>;
    this.O = <Icon name = "circle-outline" style = {styles.tileO}/>;

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
      scoreX: 0,
      scoreO: 0,
    }

    this.initialState = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]

  }

  initializeGame = () => {
    this.setState({gameState:
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]});
  }

  onTilePress = (row, col) => {
    // Don't allow tiles to change
    var value = this.state.gameState[row][col];
    if (value != 0){ return;}

    var arr = this.state.gameState.slice();
    arr[row][col] = this.state.currentPlayer;;
    this.setState({gameState: arr});

    if (this.state.currentPlayer == 1){
      this.setState({currentPlayer: -1});
    }
    else{
      this.setState({currentPlayer: 1});
    }

    // Check for getWinner
    var winner = this.getWinner(arr);
    if (winner == 1){
      this.setState({scoreX: this.state.scoreX + 1})
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    }
    else if (winner == -1) {
      this.setState({scoreO: this.state.scoreO + 1})
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }
    else if (this.checkDraw()){
      Alert.alert("Draw!")
      this.initializeGame();
    }
  }

  checkDraw = () => {

    var arr = this.state.gameState;

    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if (arr[i][j] == 0){
          return false;
        }
      }
    }
    return true;
  }

  getWinner = (board) => {
    var sum;
    // check rows

    for(var i = 0; i < 3; i++){
      sum = board[i][0] + board[i][1] + board[i][2];
      if (sum == 3){
        return 1;
      }
      else if (sum == -3){
        return -1;
      }
      sum = board[0][i] + board[1][i] + board[2][i];
      if (sum == 3){
        return 1;
      }
      else if (sum == -3){
        return -1;
      }
    }

    sum = board[0][0] + board[1][1] + board[2][2];
    if (sum == 3){
      return 1;
    }
    else if (sum == -3){
      return -1;
    }

    sum = board[0][2] + board[1][1] + board[2][0];
    if (sum == 3){
      return 1;
    }
    else if (sum == -3){
      return -1;
    }

    return 0;
  }


  returnIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return this.X;
      case -1: return this.O;
      default: return <View />;
    }
  }

  render(){
  return (
    <View style={styles.container}>
    <Text style = {styles.title}>Tic Tac Toe</Text>
    <View style = {{flexDirection: "row"}}>
       <TouchableOpacity onPress={() => this.onTilePress(0,0)} style = {styles.tile}>
       {this.returnIcon(0,0)}
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.onTilePress(0,1)} style = {styles.tile}>
       {this.returnIcon(0,1)}
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.onTilePress(0,2)}  style = {[styles.tile, {borderRightWidth :0}]}>
       {this.returnIcon(0,2)}
       </TouchableOpacity>
    </View>
    <View style = {{flexDirection: "row"}}>
       <TouchableOpacity onPress={() => this.onTilePress(1,0)}  style = {styles.tile}>
       {this.returnIcon(1,0)}
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.onTilePress(1,1)}  style = {styles.tile}>
       {this.returnIcon(1,1)}
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.onTilePress(1,2)}  style = {[styles.tile, {borderRightWidth :0}]}>
       {this.returnIcon(1,2)}
       </TouchableOpacity>
    </View>
    <View style = {{flexDirection: "row"}}>
       <TouchableOpacity onPress={() => this.onTilePress(2,0)}  style = {[styles.tile, {borderBottomWidth: 0}]}>
       {this.returnIcon(2,0)}
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.onTilePress(2,1)}  style = {[styles.tile, {borderBottomWidth: 0}]}>
       {this.returnIcon(2,1)}
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.onTilePress(2,2)}  style = {[styles.tile, {borderRightWidth :0, borderBottomWidth: 0}]}>
       {this.returnIcon(2,2)}
       </TouchableOpacity>
    </View>
    <View style = {{flexDirection: "row"}}>
    <Text style = {styles.X}>X: {this.state.scoreX}</Text>
    <Text style = {styles.O}> O : {this.state.scoreO}</Text>
    </View>
    </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title :{
    fontSize: 70,
    fontWeight: "bold",
    color: "indigo",
    fontFamily: "Times New Roman",
    paddingBottom: 20,
  },
  tile :{
    borderWidth: 12,
    borderColor: "black",
    height: 110,
    width:110,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tileX :{
    color: "red",
    fontSize: 100,
  },
  tileO :{
    color: "green",
    fontSize: 100,
  },
  O: {
    fontSize: 70,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    paddingTop: 20,
    color: "green",
  },
  X: {
    fontSize: 70,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    paddingTop: 20,
    paddingRight: 30,
    color: "red",
  }
});
