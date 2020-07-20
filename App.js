import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Dimensions,Modal, DevSettings} from 'react-native';
import Slider from 'react-native-slider';
import Countdown from 'react-native-countdown-component';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class App extends React.Component{

  state={
    ques_num:[1,2,3,4,5,6,7,8,9,10],
    selected_option_index:10,
    current_ques_number:1,
    jump_ques_num:20, 
    correct:0,
    data:[],
    options:[],
    end:false,
  } 


  componentDidMount(){

    fetch('https://opentdb.com/api.php?amount=10')
    .then(res => res.json())  
    .then(resjsn => {

      this.setState({options:resjsn.results['0'].incorrect_answers});
      this.state.options.push(resjsn.results['0'].correct_answer);
      this.setState({options:this.suffle(this.state.options)});
      this.setState({data:resjsn.results});
    })
    
  }


  suffle = (arr) => {

    var i,j,temp;
    for(i=arr.length - 1 ; i>0 ; i--){
      j = Math.floor(Math.random()*(i+1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
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
        return 'rgba(211,211,211,0.8)'
        else
        return 'rgba(211,211,211,0.4)'

  }

  getnumtextcolor = (index) => {

    if(index < this.state.current_ques_number)
      return 'white'
      else 
      return 'blue'

  }


  Next = () => {

    let ans = this.state.data[this.state.current_ques_number - 1].correct_answer;
    let ans_selected = this.state.options[this.state.selected_option_index];

    if(ans == ans_selected){
      this.setState(pre => ({correct:pre.correct + 1}));
    }


    if(this.state.current_ques_number < 10){
      this.setState(pre => ({current_ques_number:pre.current_ques_number + 1}));

      setTimeout(() => {
        this.setState({options:this.state.data[this.state.current_ques_number - 1].incorrect_answers});
        this.state.options.push(this.state.data[this.state.current_ques_number - 1].correct_answer);
        this.setState({options:this.suffle(this.state.options)});
      },0);

      this.setState({selected_option_index:10});
    }else{
        this.setState({end:true});
    }

  }
 

  render(){


  if(this.state.data.length > 0){

  var ques = this.state.data[this.state.current_ques_number - 1].question.split("&#039;").join("\'").split("&quot;").join("\"").split("&eacute;").join("e");

  
  
  return (
    < View style={styles.container}>
      <Modal
        visible={this.state.end}>

            <View style={{height:'100%',width:'100%',backgroundColor:'wheat'}}>
              <ScrollView>
                    <Text style={{fontSize:40,fontWeight:'bold',marginTop:20,alignSelf:'center',marginBottom:20}}>Score   {this.state.correct}</Text>

                    <View>
                      {this.state.data.map((data,index) => {

                        return(
                          <View style={{width:95/100*width,alignSelf:'center',borderBottomColor:'gray',borderBottomWidth:1,marginBottom:5,marginTop:5,padding:5}}>
                          <Text style={{marginBottom:5}}>Q.{index+1} {data.question.split("&#039;").join("\'").split("&quot;").join("\"").split("&eacute;").join("e")}</Text>
                        <Text>Ans.  {data.correct_answer.split("&#039;").join("\'").split("&quot;").join("\"").split("&eacute;").join("e")}</Text>
                      </View>
                        )
                      })}
                    </View>

                      <TouchableOpacity style={styles.restart} onPress={() => DevSettings.reload()}>
                         <Text style={{alignSelf:'center',fontSize:21,fontWeight:'bold',color:'white'}}>Restart</Text>
                      </TouchableOpacity>

              </ScrollView>
            </View>
        </Modal>
        
      <ScrollView style={{height:height,width:width}}>

      <View style={styles.header} >
            <Text style={styles.header_text}>2-Min Quiz</Text>
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
                    maximumTrackTintColor='white'
                    />
              </View>
          </View>


          <View style={styles.timer_box}>
                   <Countdown
                    until={2*60}
                    onFinish={() => this.setState({end:true})}
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
      <Text style={styles.ques_text}>{ques}</Text>
      </View>


      <View style={styles.options_container} >
        {this.state.options.map((data,index) => {

          return(

            <TouchableOpacity
            onPress={() => this.setState({selected_option_index:index})}
            style={{width:'85%',height:40,marginBottom:15,marginTop:5}}
            >
          <View style={[styles.opt_list_container,{backgroundColor:this.getColor(index)}]}>
            <Text style={{color:'rgba(0,0,128,1)',fontSize:20}}>{String.fromCharCode(65 + index)}.</Text>
            <View style={{marginLeft:10}}><Text style={{color:'rgba(0,0,128,0.9)',fontSize:15}}>{data.split("&#039;").join("\'").split("&quot;").join("\"").split("&eacute;").join("e")}</Text></View> 
          </View>

          </TouchableOpacity>
          
           );
        })} 

      </View>


          <TouchableOpacity style={styles.operation_button} onPress={() => this.Next()}>
            <Text style={styles.operation_text}>NEXT ></Text></TouchableOpacity> 

    
    </ScrollView>

   </View>

  );
      }else 
        return null;
      
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width:width,
    height:height,
  },

  header:{
    height:height*17/100,
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
    height:height*7/100,
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
    paddingLeft:5,
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
    height:40,
    width:100,
    backgroundColor:'rgba(0,0,128,0.9)',
    marginRight:11,
    marginLeft:width - 130,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:50,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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


  restart:{
    height:55,
    width:210,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:'orange',
    alignSelf:'center',
    marginBottom:30,
    marginTop:20,
},


});


