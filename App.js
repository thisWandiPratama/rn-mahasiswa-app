
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
  TouchableOpacity,
  Modal,
  Alert
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
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(()=> {
    getData()
    
      },[])

      const getData = () => {
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
      }

      const renderData = () => {
        return data.map((value, index) => (
          <View key={index} style={{marginTop:10, borderBottomColor:"#aeaeae", borderBottomWidth:1, marginBottom:5}}>
          <View  style={{width:"90%", height:200,flexDirection:"row", flexWrap:"wrap",}}>
          <View style={{width:"50%", height:20,  marginBottom:10, marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>NPM</Text>
              <Text>{value.npm}</Text>
          </View>
            <View style={{width:"50%", height:20,  marginBottom:10,marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Nama</Text>
              <Text>{value.nama}</Text>
            </View>
            <View style={{width:"50%", height:20,  marginBottom:10,marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Mata Kuliah</Text>
              <Text>{value.nm_mk}</Text>
            </View>
            <View style={{width:"50%", height:20,  marginBottom:10,marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Nilai Tugas</Text>
              <Text>{value.ntugas}</Text>
            </View>
            <View style={{width:"50%", height:20,  marginBottom:10,marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Nilai Quiz</Text>
              <Text>{value.nquiz}</Text>
            </View>
            <View style={{width:"50%", height:20,  marginBottom:10,marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Nilai UTS</Text>
              <Text>{value.nuts}</Text>
            </View>
            <View style={{width:"50%", height:20,  marginBottom:10,marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Nilai UAS</Text>
              <Text>{value.nuas}</Text>
            </View>
            <View style={{width:"50%", height:20,marginTop:10}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Total Nilai(mean)</Text>
              <Text>{value.total}({value.total>=81 ? "A" : value.total>=71 ? "B" :value.total>=61 ? "C" : "D"})</Text>
            </View>
          </View>
          <View style={{width:"100%",alignItems:"center"}}>
          <TouchableOpacity onPress={() => deletedata(value.id)} style={{width:"90%", height:40, backgroundColor:"#aeaeae", alignItems:"center", justifyContent:"center", marginBottom:10, borderRadius:20}}>
              <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>Hapus</Text>
            </TouchableOpacity>
          </View>

          </View>

        ))
      }


      const simpan = () => {
        setIsLoading1(true)
        console.log(typeof nuas)

        if(npm.length>0||nama.length>0||nmmk.length>0||ntugas.length>0||nquiz.length>0||nuts.length>0||nuas.length){
          fetch("http://koperasi.crossnet.co.id:9999/api/v1/add_mahasiswa", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              npm:npm,
              nama:nama,
              nm_mk:nmmk,
              ntugas: parseFloat(ntugas),
              nquiz:parseFloat(nquiz),
              nuts:parseFloat(nuts),
              nuas:parseFloat(nuas)
          }),
          })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          getData()
          setTimeout(() => {
            setIsLoading1(false)
            setModalVisible(!modalVisible)
          }, 3000);
        })
        .catch(err => {
          console.log(err)
          setIsLoading1(false)
          setModalVisible(!modalVisible)
        })
        }else{
          alert("Tidak boleh ada yang kosong")
          setIsLoading1(false)
    }
      }

      const deletedata = (id) => {
        setIsLoading1(true)

          fetch("http://koperasi.crossnet.co.id:9999/api/v1/delete_mahasiswa/"+id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
          })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          getData()
          setTimeout(() => {
            setIsLoading1(false)
          }, 3000);
        })
        .catch(err => {
          console.log(err)
          setIsLoading1(false)
        })
      }

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar barStyle={ 'light-content'} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex:1}}>
          <View >
          <View style={{height:"35%", alignItems:'center', }}>
        <Text style={{fontSize: 25, fontWeight:"bold", color:"black"}}>Data Nilai Mahasiswa</Text>
        <View style={{width:"90%", flexDirection:"row", flexWrap:"wrap", marginTop:10}}>
        <View style={{width:"50%", height:60, borderBottomWidth:1, borderBottomColor:"#aeaeae", marginBottom:10}}>
          <Text style={{fontSize: 14, color:"#000", fontWeight:"bold"}}>NPM</Text>
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
        <TouchableOpacity
             style={{height: 50, width:"90%", backgroundColor:"#aeaeae", justifyContent:"center", alignItems:"center", borderRadius:20}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{fontSize:20, color:"black", fontWeight:"bold"}}>Cancel</Text>
            </TouchableOpacity>
      </View>
          </View>
        </View>
      </Modal>
      <Text style={{fontSize: 25, fontWeight:"bold", color:"black", textAlign:"center"}}>Data Nilai Mahasiswa</Text>
      <View style={{width:"100%", alignItems:"center"}}>
      <TouchableOpacity
              style={{height: 50, width:"90%", backgroundColor:"#aeaeae", justifyContent:"center", alignItems:"center", borderRadius:20}}
              onPress={() => setModalVisible(!modalVisible)}
              >
              <Text style={{fontSize:20, color:"black", fontWeight:"bold"}}>Tambah Data Nilai Mahasiswa</Text>
            </TouchableOpacity>
            </View>
            <View style={{width:"90%", alignItems:"center"}}>
            <View style={{width:"90%", }}>
            <Text>Keterangan:</Text>
            <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap"}}> 
              <View style={{width:"50%"}}>
                <Text>A 100 - 81: Sangat Baik</Text>
              </View>
              <View style={{width:"50%"}}>
                <Text>B 80 - 71: Baik</Text>
              </View>
              <View style={{width:"50%"}}>
                <Text>C 70 - 61: Cukup</Text>
              </View>
              <View style={{width:"50%"}}>
                <Text>D Dibawah 60: Kurang</Text>
              </View>
            </View>
            </View>
            </View>
          { isloading==true ? <ActivityIndicator/> :
          <View style={{marginLeft: 20, marginRight: 20, flex:1}}>
        <ScrollView>
          {renderData()}
        </ScrollView>
            </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
