import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Slider from 'react-native-slider';
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
      return 'rgba(60,179,113,0.8)'
      else
        return 'white'
  }


  Attempted_ques_Color = (index) => {

    if(index < this.state.current_ques_number)
      return 'rgba(0,0,128,0.9)'
      else if(index == this.state.jump_ques_num)
        return 'rgba(211,211,211,0.9)'
        else
        return 'rgba(211,211,211,0.4)'

  }

  getnumtextcolor = (index) => {

    if(index < this.state.current_ques_number)
      return 'white'
      else
      return 'blue'

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
                  <Text style={{color:'rgba(0,0,128,0.9)',fontSize:18,fontWeight:'bold'}}>{this.state.current_ques_number}/{this.state.ques_num.length} Question</Text>
              </View>
              <View style={styles.seeker_bar} >
                  <Slider
                    value={this.state.current_ques_number/this.state.ques_num.length}
                    thumbTintColor='yellow'
                    disabled={true}
                    thumbTintColor='white'
                    style={{height:10}}
                    thumbStyle={{width:5,height:5}}
                    minimumTrackTintColor='green'
                    />
              </View>
          </View>


          <View style={styles.timer_box}>
                   <Countdown
                    until={10*60}
                    onFinish={() => alert('Time out')}
                    timeToShow={['M','S']}
                    timeLabels={{m:'',s:''}}
                    digitStyle={{backgroundColor: ''}}
                    digitTxtStyle={{color: 'rgba(0,0,128,0.9)',fontSize:20,fontWeight:'bold'}}
                    digitStyle={{width:25}}
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
                <Text style={{color:this.getnumtextcolor(index),fontSize:18,fontWeight:'bold'}}>{data}</Text>
            </View>
            </TouchableOpacity>
          );
        })}

 </ScrollView>
      </View>

      <View style={styles.ques}>
        <View style={{height:50}}><Text style={{fontSize:25,color:'rgb(0,0,128)',fontWeight:'bold'}}>Question  {this.state.current_ques_number}</Text></View>
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
            <Text style={{color:'rgba(0,0,128,1)',fontSize:20}}>{String.fromCharCode(65 + index)}.</Text>
            <View style={{marginLeft:10}}><Text style={{color:'rgba(0,0,128,0.9)',fontSize:15}}>{data}</Text></View> 
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
    color:'white',
    fontSize:35,
    fontWeight:'bold',
  },

  timer_container:{
    height:'10%',
    width:'100%',
    backgroundColor:'rgba(211,211,211,0.4)',
    flexDirection:'row',
  },

  number:{
    height:'7%',
    width:'100%',
    flexDirection:'row',
    alignItems:'center'
  },

  ques:{
    width:'100%',
    padding:20
  },

  ques_text:{
    color:'rgb(0,0,128)',
    fontSize:18,
  },

  options_container:{
    width:'100%',
    paddingTop:10,
    alignItems:'center',
    justifyContent:'center',
  },

  operation:{
    height:'10%',
    width:'100%',
    flexDirection:'row',
    alignItems:'center'
  },

  seeker:{
    height:'100%',
    width:'60%',
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
    marginRight:7,
    marginLeft:7,
    marginTop:3,
    marginBottom:3,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  },

  operation_button:{
    height:'60%',
    width:'27%',
    backgroundColor:'rgba(0,0,128,0.9)',
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


