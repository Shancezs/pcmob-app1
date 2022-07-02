import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { useState } from "react";

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);
  
  function renderItem({ item }){
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
    <BlockRGB red={item.red} green={item.green} blue={item.blue} />
    </TouchableOpacity>
    );
  }

  function addColor() {
    setColorArray([
      
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      ...colorArray,
    ]);
  }

  function resetColors(){
    setColorArray([]);
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={addColor}
      >
        <Text style={{ color: "red" }}>Add Color</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={{ height: 40, justifyContent: "center" }}
      onPress={resetColors}
      >
        <Text style={{ color: "red" }}>Reset Color</Text>
      </TouchableOpacity>
      <FlatList 
      data={colorArray} 
      renderItem={renderItem} 
      style={{ width: "100%" }}  
      />
    </View>
  );
  
}

function DetailsScreen({ route }){
  const{ red, green, blue } = route.params;
  return (
    <View 
    style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})`, flex:1 }}
    >
  <Text>red: {red}</Text>
  <Text>green: {green}</Text>
  <Text>blue: {blue}</Text>
  </View>
  );
}


const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Details" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 list: {
  width: "100%"
 },
});