import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import Text from "../components/MyText";
import { Icon, CheckBox, Button } from "react-native-elements";
import { TextField } from "react-native-material-textfield";
import { AndroidBackHandler } from "react-navigation-backhandler";

import * as actions from "../actions";
import Colors from "../config/colors";

class PhrazeDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Icon
        name="close"
        color={Colors.text.white}
        onPress={() => navigation.dismiss()}
        underlayColor="transparent"
        containerStyle={{ marginLeft: 20 }}
      />
    ),
    headerTitle: "Edit Phraze",
    headerRight: (
      <Button
        buttonStyle={styles.saveButton}
        title="SAVE"
        onPress={() => navigation.state.params.handleSave()}
      />
    )
  });

  state = {
    category: "",
    phraze: "",
    translated: "",
    isPublic: false
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ handleSave: this.onPressSave });
    const item = navigation.getParam("item", false);
    this.setState({
      category: item.category,
      phraze: item.phraze,
      translated: item.translated,
      isPublic: item.public
    });
  }

  onPressSave = () => {
    const item = this.props.navigation.getParam("item", {});

    const phraze = { ...item };

    if (this.state.category != "") phraze.category = this.state.category;
    if (this.state.phraze != "") phraze.phraze = this.state.phraze;
    if (this.state.translated != "") phraze.translated = this.state.translated;
    if (this.state.isPublic != item.public) phraze.public = this.state.isPublic;

    this.props.onSavePhraze(phraze);
    this.props.onGetPhrazesByCategory(phraze.category);
    this.props.navigation
      .getParam("parentNavigation")
      .setParams({ title: phraze.category });
    this.props.navigation.dismiss();
  };

  onBackButtonPressAndroid = () => {
    this.props.navigation.dismiss();
    return true;
  };

  handleDelete = () => {
    Alert.alert(
      "Please Confirm",
      "Are you sure you want to delete\nthis Phraze?",
      [
        { text: "Cancel", onPress: () => console.log("Cancel") },
        {
          text: "Confirm",
          onPress: () => {
            const item = this.props.navigation.getParam("item", {});
            const phraze = { ...item };

            this.props.onDeletePhraze(phraze.key);
            this.props.onGetPhrazesByCategory(phraze.category)
            this.props.navigation.dismiss();
          }
        }
      ],
      { cancelable: true }
    );
  };

  render() {
    const { navigation } = this.props;
    const { phraze, translated, category, isPublic } = this.state;
    const item = navigation.getParam("item", false);

    if (!item) return <Text>No Data</Text>;

    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <ScrollView style={styles.container}>
          <TextField
            label="Category"
            value={category}
            onChangeText={category => this.setState({ category })}
            tintColor={Colors.mainColor.light}
          />
          <TextField
            label={"Native"}
            value={phraze}
            onChangeText={phraze => this.setState({ phraze })}
            tintColor={Colors.mainColor.light}
            multiline
            fontSize={32}
          />

          <TextField
            label="Translation"
            value={translated}
            onChangeText={translated => this.setState({ translated })}
            tintColor={Colors.mainColor.light}
            multiline
          />

          <View style={styles.recordContainer}>
            <Text style={{ color: Colors.text.dark, fontSize: 18 }}>
              Play the record
            </Text>
            <Icon
              name="play-arrow"
              color={Colors.mainColor.light}
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
            checkedColor={Colors.mainColor.light}
            textStyle={{ color: Colors.icon.grey.dark, fontWeight: "300" }}
            title="Public"
            checked={isPublic}
            onPress={() => this.setState({ isPublic: !isPublic })}
          />
          <Icon
            name="delete"
            containerStyle={styles.deleteButtonContainer}
            onPress={this.handleDelete}
            color="#ff0000"
            size={28}
          />
        </ScrollView>
      </AndroidBackHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 15
  },
  recordContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15
  },
  checkBoxContainer: {
    backgroundColor: Colors.backgroundColor,
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 0
  },
  saveButton: {
    backgroundColor: "transparent",
    padding: 3
  },
  deleteButtonContainer: {
    marginVertical: 15,
    alignItems: "flex-start"
  }
});

const mapDispatchToProps = dispatch => ({
  onSavePhraze: phraze => dispatch(actions.editPhrase(phraze)),
  onDeletePhraze: phrazeKey => dispatch(actions.deletePhraze(phrazeKey)),
  onGetPhrazesByCategory: category =>
    dispatch(actions.getPhrazesByCategory(category))
});

export default connect(
  null,
  mapDispatchToProps
)(PhrazeDetailScreen);
