import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import Text from "../components/MyText";
import {
  Icon,
  CheckBox,
  Button as ElementsButton
} from "react-native-elements";
import { TextField } from "react-native-material-textfield";
import { AndroidBackHandler } from "react-navigation-backhandler";

import { Button, TextInput, HelperText } from "react-native-paper";

import * as actions from "../actions";
import Colors from "../config/colors";

import EN from "../language/en/new_phrase.json";

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
      <ElementsButton
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

    let itemHasSound = false;
    console.log(item);
    if (item.sound.path || item.sound.object) itemHasSound = true;

    this.setState({
      isPlayButtonDisabled: !itemHasSound,
      category: item.category,
      phraze: item.phraze,
      translated: item.translated,
      isPublic: item.public,
      sound: item.sound
    });
  }

  onPressSave = () => {
    const { recordSound } = this.state;
    const item = this.props.navigation.getParam("item", {});

    const phraze = { ...item };

    if (this.state.category != "") phraze.category = this.state.category;
    if (this.state.phraze != "") phraze.phraze = this.state.phraze;
    if (this.state.translated != "") phraze.translated = this.state.translated;
    if (this.state.isPublic != item.public) phraze.public = this.state.isPublic;

    if (recordSound) phraze.sound = { object: recordSound };

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
            this.props.onGetPhrazesByCategory(phraze.category);
            this.props.navigation.dismiss();
          }
        }
      ],
      { cancelable: true }
    );
  };

  onRecordingStart = async () => {
    this.recording = new Expo.Audio.Recording();
    const { recording } = this;

    try {
      await Expo.Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
      });

      await recording.prepareToRecordAsync(
        Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      console.log(await recording.getStatusAsync());

      await recording.startAsync();

      this.setState({
        isRecording: true
      });
    } catch (error) {
      console.log(error);

      this.setState({
        isRecording: false
      });
    }
  };

  onRecordingStop = async () => {
    const { recording } = this;

    await recording.stopAndUnloadAsync();

    this.setState({
      isRecording: false
    });

    const { sound } = await recording.createNewLoadedSound();

    this.setState({
      recordSound: sound,
      isPlayButtonDisabled: false
    });
  };

  onRecordPlay = async () => {
    const { recordSound, sound } = this.state;

    if (recordSound) {
      await recordSound.replayAsync();
    } else if (sound.object) {
      await sound.object.replayAsync();
    } else {
      const soundObject = new Expo.Audio.Sound();
      await soundObject.loadAsync({ uri: sound.path }, {}, true);
      await soundObject.playAsync();
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      phraze,
      translated,
      category,
      isPublic,
      isPlayButtonDisabled,
      isRecording
    } = this.state;
    const item = navigation.getParam("item", false);

    if (!item) return <Text>No Data</Text>;

    let recorder = (
      <Button
        icon="mic"
        mode="outlined"
        onPress={() => {
          this.onRecordingStart();
        }}
        compact={false}
        dark
      >
        {isPlayButtonDisabled ? "Add voice record" : "Retake voice recording"}
      </Button>
    );

    if (isRecording)
      recorder = (
        <Button
          icon="stop"
          mode="contained"
          color="#B00020"
          onPress={this.onRecordingStop}
          compact={false}
          dark
        >
          Stop recording
        </Button>
      );

    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <ScrollView style={styles.container}>
          <View style={styles.inputContainerStyle}>
            <View style={styles.inputContainerStyle}>
              <TextInput
                label={EN.categoryInput.label}
                value={category}
                onChangeText={category => this.setState({ category })}
              />
            </View>
            <TextInput
              label={EN.phraseInput.label}
              value={phraze}
              onChangeText={phraze => this.setState({ phraze })}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={EN.translationInput.label}
              value={translated}
              onChangeText={translated => this.setState({ translated })}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <Button
              icon="play-arrow"
              mode="contained"
              onPress={() => {
                this.onRecordPlay();
              }}
              compact={false}
              dark
              disabled={isPlayButtonDisabled}
            >
              Play record
            </Button>
          </View>
          <View style={styles.inputContainerStyle}>{recorder}</View>
          <View>
            <Button
              icon="delete"
              mode="contained"
              color="#B00020"
              onPress={this.handleDelete}
              compact={false}
              dark
            >
              Delete
            </Button>
          </View>
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
  },
  inputContainerStyle: {
    marginBottom: 8
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
