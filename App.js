import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  RefreshControl,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      list: [],
      sum: 0,
      refreshing: false,
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess = (e) => {
    var tempList = e.data.split('+');
    this.setState({
      isloading: false,
      list: [...this.state.list, {item: tempList[1], qty: tempList[2] * 1}],
    });
  };

  updateItem(item, i, e) {
    console.log(e);
    var array = [...this.state.list];
    array[i] = {item: item, qty: e * 1};
    this.setState({
      list: array,
    });
  }

  removeItem(i) {
    var array = [...this.state.list];
    array.splice(i, 1);
    this.setState({
      list: array,
    });
  }

  refresh() {
    this.setState({
      isloading: true,
      list: [],
      sum: 0,
      refreshing: true,
    });
  }

  render() {
    //sum qty in array
    const total = this.state.list.reduce((prev, next) => prev + next.qty, 0);

    return (
      <View style={styles.container}>
        {/* QR Scanner & content*/}
        <View style={styles.qrscan}>
          <QRCodeScanner
            onRead={this.onSuccess}
            reactivate={true}
            reactivateTimeout={1000}
            flashMode={RNCamera.Constants.FlashMode.off}
          />
        </View>

        {/* Content */}
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            ref={(view) => {
              this.scrollView = view;
            }}
            onContentSizeChange={() =>
              this.scrollView.scrollToEnd({animated: true})
            }
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
              <RefreshControl
                tintColor={'#ff0000'}
                refreshing={false}
                onRefresh={this.refresh.bind(this)}
              />
            }
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                {this.state.isloading ? (
                  <View style={styles.loading}>
                    <Text style={styles.sectionDescription}>
                      กำลังรอการสแกน
                    </Text>
                    <ActivityIndicator
                      animating={true}
                      size="large"
                      color="#0066CC"
                    />
                  </View>
                ) : (
                  this.state.list.map((item, index) => {
                    return (
                      <View style={styles.listView} key={index}>
                        <Text style={styles.list}>{index + 1}</Text>
                        <Text style={styles.list}>{item.item}</Text>
                        <TextInput
                          keyboardType="number-pad"
                          style={styles.input}
                          onChangeText={(e) => {
                            this.updateItem(item.item, index, e);
                          }}>
                          {item.qty}
                        </TextInput>
                        <Button
                          title="ลบ"
                          color="#FF4343"
                          onPress={() => {
                            this.removeItem(index);
                          }}
                        />
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={{color: '#FFF', fontSize: 18}}>รวม: {total}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  qrscan: {
    flex: 0.5,
  },
  safeAreaView: {
    flex: 0.45,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
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
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006AE2',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
  },
  listView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 24,
  },
  list: {
    fontSize: 14,
  },
  button: {
    color: '#ff0000',
  },
  loading: {
    alignItems: 'center',
  },
});
