import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Slider, ScrollView, TouchableOpacity} from 'react-native';
import Countdown from 'react-native-countdown-component';

export default class App extends React.Component{

  state={
    ques_num:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    selected_ques_index:0,
    selected_option_index:10,
    current_ques_number:1,
    jump_ques_num:21,
    data:[
      {
        ques:'How many edges in a Triangle',
        ans:'3 ',
        options:['1','2','3','4'],
      }
    ]
  }


  getColor = (index) => {

    if(this.state.selected_option_index == index)
      return 'red'
      else
        return 'white'
  }


  Attempted_ques_Color = (index) => {

    if(index < this.state.current_ques_number)
      return 'wheat'
      else if(index == this.state.jump_ques_num)
        return 'gray'
        else
        return 'silver'

  }


  render(){
  return (
    < View style={styles.container}>


      <View style={styles.header} >
            <Text style={styles.header_text}>MOCK TEST</Text>
      </View>


      <View style={styles.timer_container}>
          <View style={styles.seeker}>
              <View style={styles.seeker_text}>
                  <Text>{this.state.current_ques_number}/20 Question</Text>
              </View>
              <View style={styles.seeker_bar} >
                  <Slider
                    thumbTintColor='red'
                    disabled='true'
                  />
              </View>
          </View>


          <View style={styles.timer_box}>
                   <Countdown
                    until={10*60}
                    size={15} 
                    timeToShow={['M','S']}
                    timeLabels={{m:'',s:''}}
                    showSeparator
                  />
            </View>
      </View>


      <View style={styles.number}>

<ScrollView
horizontal={true}
showsHorizontalScrollIndicator={false}
>
        {this.state.ques_num.map((data,index) => {
          return(
            <TouchableOpacity
            onPress={() => this.setState({jump_ques_num:index})}>
            <View style={[styles.num_text,{backgroundColor:this.Attempted_ques_Color(index)}]}>
                <Text>{data}</Text>
            </View>
            </TouchableOpacity>
          );
        })}

 </ScrollView>
      </View>

      <View style={styles.ques}>
        <View style={{height:50}}><Text style={{fontSize:25,color:'white',fontWeight:'bold'}}>Question  {this.state.current_ques_number}</Text></View>
      <Text style={styles.ques_text}>{this.state.data[this.state.selected_ques_index].ques}</Text>
      </View>


      <View style={styles.options_container} >
        {this.state.data[this.state.selected_ques_index].options.map((data,index) => {

          return(

            <TouchableOpacity
            onPress={() => this.setState({selected_option_index:index})}
            style={{width:'85%',height:40,marginBottom:15,marginTop:5}}
            >
          <View style={[styles.opt_list_container,{backgroundColor:this.getColor(index)}]}>
            <Text style={{color:'blue',fontSize:20}}>{String.fromCharCode(65 + index)}.</Text>
            <View style={{marginLeft:10}}><Text style={{color:'blue',fontSize:15}}>{data}</Text></View> 
          </View>
          </TouchableOpacity>
          );
        })}

      </View>

      <View style={styles.operation}>
          <View style={styles.operation_button}><Text style={styles.operation_text}>SKIP ></Text></View>
          <View style={styles.operation_button}><Text style={styles.operation_text}>REMARK</Text></View>
          <View style={styles.operation_button}><Text style={styles.operation_text}>NEXT ></Text></View>
      </View>

    </View>
  );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header:{
    height:'18%',
    width:'100%',
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },

  header_text:{
    color:'wheat',
    fontSize:30,
    fontWeight:'bold',
  },

  timer_container:{
    height:'10%',
    width:'100%',
    backgroundColor:'gray',
    flexDirection:'row',
  },

  number:{
    height:'7%',
    width:'100%',
    backgroundColor:'yellow',
    flexDirection:'row',
    alignItems:'center'
  },

  ques:{
    width:'100%',
    backgroundColor:'blue',
    padding:20
  },

  ques_text:{
    color:'white',
    fontSize:18,
  },

  options_container:{
    width:'100%',
    backgroundColor:'green',
    paddingTop:10,
    alignItems:'center',
    justifyContent:'center',
  },

  operation:{
    height:'10%',
    width:'100%',
    backgroundColor:'red',
    flexDirection:'row',
    alignItems:'center'
  },

  seeker:{
    height:'100%',
    width:'60%',
    backgroundColor:'green',
  },

  timer_box:{
    height:'100%',
    width:'40%',
    alignItems:'center',
    justifyContent:'center',
  },

  time:{
    color:'blue',
    fontSize:25,
    fontWeight:'bold',
  },

  seeker_text:{
    height:'60%',
    width:'100%',
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center',
  },

  seeker_bar:{
    height:'40%',
    width:'100%',
  },

  num_text:{
    height:40,
    width:40,
    marginRight:3,
    marginLeft:3,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  },

  operation_button:{
    height:'60%',
    width:'27%',
    backgroundColor:'blue',
    marginRight:11,
    marginLeft:11,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },

  operation_text:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
  },

  opt_list_container:{
      width:'100%',
      height:'100%',
      borderRadius:10,
      borderWidth:1,
      borderColor:'gray',
      paddingLeft:10,
      flexDirection:'row',
      alignItems:'center',
  },

});
