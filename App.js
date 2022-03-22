
import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from 'react-native';


const App = () => {
  const [data, setData] = useState([])
  const [npm, setNpm] = useState("")
  const [nama, setNama] = useState("")
  const [nmmk, setNmmk] = useState("")
  const [ntugas, setNtugas] = useState(0)
  const [nquiz, setNquiz] = useState(0)
  const [nuts, setNuts] = useState(0)
  const [nuas, setNuas] = useState(0)
  const [isloading, setIsLoading] = useState(true)
  const [isloading1, setIsLoading1] = useState(false)

  useEffect(()=> {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://koperasi.crossnet.co.id:9999/api/v1/all_mahasiswa", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setIsLoading(false)
        setData(result.data)
      })
      .catch(error => console.log('error', error));
      },[])

      const renderData = () => {
        return data.map((value, index) => (
          <View key={index}>
            <Text>{value.npm}</Text>
          </View>
        ))
      }


      const simpan = () => {
        setIsLoading1(true)
        console.log(nuas.length==0)

        if(npm.length>0||nama.length>0||nmmk.length>0||ntugas.length>0||nquiz.length>0||nuts.length>0||nuas.length){
          fetch("http://koperasi.crossnet.co.id:9999/api/v1/add_mahasiswa", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "npm":npm,
              "nama":nama,
              "nm_mk":nmmk,
              "ntugas": ntugas,
              "nquiz":nquiz,
              "nuts":nuts,
              "nuas":nuas
          }),
          })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setIsLoading1(false)
          renderData()
        })
        .catch(err => {
          console.log(err)
          setIsLoading1(false)
        })
        }else{
          alert("Tidak boleh ada yang kosong")
          setIsLoading1(false)
    }
      }


  return (
    <SafeAreaView>
      <StatusBar barStyle={ 'light-content'} />
      <View style={{height:"55%", margin: 5, marginRight: 20, marginLeft: 20, alignItems:'center'}}>
        <Text style={{fontSize: 25, fontWeight:"bold", color:"black"}}>Data Nilai Mahasiswa</Text>
        <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>NPM{nama.length}</Text>
          <TextInput 
          placeholder='Masukan NPM'
          onChangeText={(value) => setNpm(value)}
          />
        </View>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Nama</Text>
          <TextInput 
          placeholder='Masukan Nama'
          onChangeText={(value) => setNama(value)}
          />
        </View>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}> Mata Kuliah</Text>
          <TextInput 
          placeholder='Masukan Mata Kuliah'
          onChangeText={(value) => setNmmk(value)}
          />
        </View>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}> Nilai Tugas</Text>
          <TextInput 
          placeholder='Masukan Nilai Tugas'
          onChangeText={(value) => setNtugas(value)}
          />
        </View>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}> Nilai Quiz</Text>
          <TextInput 
          placeholder='Masukan Nilai Quiz'
          onChangeText={(value) => setNquiz(value)}
          />
        </View>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}> Nilai UTS</Text>
          <TextInput 
          placeholder='Masukan Nilai UTS'
          onChangeText={(value) => setNuts(value)}

          />
        </View>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}> Nilai UAS</Text>
          <TextInput 
          placeholder='Masukan Nilai UAS'
          onChangeText={(value) => setNuas(value)}
          />
        </View>
        {isloading1 == true ?
        <View style={{width:"50%", height:60,  marginBottom:10, height:60, backgroundColor:"#4542", alignItems:"center", justifyContent:"center", borderRadius:20}}>
          <ActivityIndicator size={"large"}/>
        </View>
        :
        <TouchableOpacity onPress={() => simpan()} style={{width:"50%", height:60,  marginBottom:10, height:60, backgroundColor:"#4542", alignItems:"center", justifyContent:"center", borderRadius:20}}>
          <Text style={{fontSize: 18, color:"red", fontWeight:"bold"}}> Simpan Data</Text>
        </TouchableOpacity>
        }
        </View>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor:"light-content"}}>
        <View style={{flex:1}}>
          { isloading==true ? <ActivityIndicator/> :
          <View style={{marginLeft: 20, marginRight: 20}}>
          {renderData()}
            </View>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
