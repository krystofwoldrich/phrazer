import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet } from 'react-native';
import Text from '../components/MyText';
import { Icon, CheckBox, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

import * as actions from '../actions';

const data = [
  { value: 'Finnish' },
  { value: 'German' },
  { value: 'Lithuanian' },
  { value: 'Czech' }
];

class PhrazeDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Icon
        name="close"
        color="white"
        onPress={() => navigation.dismiss()}
        underlayColor="transparent"
        containerStyle={{ marginLeft: 20 }}
      />
    ),
    headerTitle: 'Edit Phraze',
    headerRight: <Button buttonStyle={styles.saveButton} title="SAVE" onPress={() => navigation.state.params.handleSave()} />
  });

  state = {
    category: '',
    phraze: '',
    translated: '',
    isPublic: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.onPressSave})
  }

  onPressSave = () => {
    const phraze = {
      category: this.state.category,
      phraze: this.state.phraze,
      translated: this.state.translated,
      public: this.state.isPublic,
      phrazed: false,
      favorite: false,
    }
    this.props.onSavePhraze(phraze)
    this.props.navigation.dismiss()
  }

  render() {
    // const {navigation} = this.props;
    // const item = navigation.getParam("item", false);

  // if ("item")
  // {
    return (
        <ScrollView style={styles.container}>
          <Dropdown
            label="Categorie"
            data={data}
            value={this.props.category}
            onChangeText={category => this.setState({ category })}
          />
          <TextField
            label={this.state.phraze}
            value={this.state.phraze}
            onChangeText={phraze => this.setState({ phraze })}
            tintColor="#33AAAA"
            multiline
            fontSize={32}
          />

          <TextField
            label="abc"
            value={this.state.translated}
            onChangeText={translated => this.setState({ translated })}
            tintColor="#33AAAA"
            multiline
          />

          <View style={styles.recordContainer}>
            <Text style={{ color: '#586D79', fontSize: 18 }}>Record</Text>
            <Icon
              name="mic"
              color="#33AAAA"
              reverse
              raised
              containerStyle={{ marginVertical: 15 }}
              size={26}
            />
          </View>
          <CheckBox
            containerStyle={styles.checkBoxContainer}
            iconType="material"
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            checkedColor="#33AAAA"
            textStyle={{ color: '#777777', fontWeight: '300' }}
            title="Public"
            checked={isPublic}
            onPress={() => this.setState({ isPublic: !isPublic })}
          />
        </ScrollView>
      );
    // } else {
    //   <Text>No Data</Text>
    //   }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15
  },
  recordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  checkBoxContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 0
  },
  saveButton: {
    backgroundColor: 'transparent',
    padding: 3,
  }
});

const mapDispatchToProps = dispatch => ({
  onSavePhraze: phraze => dispatch(actions.addPhraze(phraze))
});

export default connect(
  null,
  mapDispatchToProps
)(PhrazeDetailScreen);
