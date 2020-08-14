import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      list: [],
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess = (e) => {
    var tempList = e.data.split('+');
    this.setState({
      isloading: false,
      list: [...this.state.list, {item: tempList[1], qty: tempList[2]}],
    });
  };

  // update = (item, index) => {
  //   const newArray = [...this.state.list];
  //   newArray[index].value = item;
  //   this.setState({list: newArray});
  // };

  render() {
    const total = this.state.list;
    console.log(total.qty);
    // console.log('list:' + this.state.list);
    return (
      <View>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <QRCodeScanner
              onRead={this.onSuccess}
              reactivate={true}
              reactivateTimeout={1000}
              flashMode={RNCamera.Constants.FlashMode.off}
            />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                {this.state.isloading ? (
                  <View style={styles.listView}>
                    <Text>กำลังรอการสแกน </Text>
                    <ActivityIndicator
                      animating={true}
                      size="large"
                      color="#0000FF"
                    />
                  </View>
                ) : (
                  this.state.list.map((item, index) => {
                    return (
                      <View style={styles.listView} key={index}>
                        <Text style={styles.list}>ลำดับที่:{index + 1}</Text>
                        <Text style={styles.list}>{item.item}</Text>
                        <Text style={styles.list}>{item.qty}</Text>
                        {/* <TextInput onChangeText={this.update(item, index)} /> */}
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <View style={styles.footer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  listView: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    fontSize: 14,
  },
  input: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
});
