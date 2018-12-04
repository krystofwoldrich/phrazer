import React, { Component } from "react";
import Expo from "expo";
import { connect } from "react-redux";

import { ScrollView, View, StyleSheet } from "react-native";
import { Button as ElementsButton, Icon } from "react-native-elements";
import { TextField } from "react-native-material-textfield";

import { Button, TextInput, HelperText } from "react-native-paper";

import * as actions from "../actions";
import Colors from "../config/colors";

import EN from "../language/en/new_phrase.json";

class NewPhrazeScreen extends Component {
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
    headerTitle: "New Phraze",
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
    isPublic: false,
    isRecording: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.onPressSave });
  }

  onPressSave = () => {
    const phraze = {
      category: this.state.category,
      phraze: this.state.phraze,
      translated: this.state.translated,
      public: this.state.isPublic,
      phrazed: false,
      favorite: false,
      sound: { object: this.state.recordSound }
    };
    this.props.onSavePhraze(phraze);
    this.props.onGetPhrazesByCategory(phraze.category);
    this.props.navigation.dismiss();
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
      recordSound: sound
    });

    //await sound.playAsync();
  };

  onRecordPlay = async () => {
    const { recordSound } = this.state;

    await recordSound.replayAsync();
  };

  render() {
    const {
      category,
      phraze,
      translated,
      isRecording,
      recordSound
    } = this.state;
    const { onRecordingStart, onRecordingStop, onRecordPlay } = this;

    let recordingAction = null;

    const addRecordingButtonGenerator = (mode, label) => (
      <Button
        icon="mic"
        mode={mode}
        onPress={onRecordingStart}
        compact={false}
        dark
      >
        {label}
      </Button>
    );

    const addRecordingButton = addRecordingButtonGenerator(
      "contained",
      EN.recordPhraseButton.label
    );

    const stopRecordingButton = (
      <Button
        icon="stop"
        mode="contained"
        color="#B00020"
        onPress={onRecordingStop}
        compact={false}
        dark
      >
        Stop recording
      </Button>
    );

    const playRecordAndRetakeButton = (
      <View>
        <View style={styles.inputContainerStyle}>
          <Button
            icon="play-arrow"
            mode="contained"
            onPress={onRecordPlay}
            compact={false}
            dark
          >
            Play record
          </Button>
        </View>
        <View>
          {addRecordingButtonGenerator("outlined", "Retake voice recording")}
        </View>
      </View>
    );

    if (isRecording) recordingAction = stopRecordingButton;
    else if (!isRecording && recordSound)
      recordingAction = playRecordAndRetakeButton;
    else recordingAction = addRecordingButton;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label={EN.phraseInput.label}
            value={phraze}
            onChangeText={phraze => this.setState({ phraze })}
          />
          <HelperText type="info">{EN.phraseInput.description}</HelperText>
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label={EN.categoryInput.label}
            value={category}
            onChangeText={category => this.setState({ category })}
          />
          <HelperText type="info">{EN.categoryInput.description}</HelperText>
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            label={EN.translationInput.label}
            value={translated}
            onChangeText={translated => this.setState({ translated })}
          />
          <HelperText type="info">{EN.translationInput.description}</HelperText>
        </View>
        <View style={styles.inputContainerStyle}>{recordingAction}</View>
      </ScrollView>
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
  inputContainerStyle: {
    marginBottom: 8
  }
});

const mapDispatchToProps = dispatch => ({
  onSavePhraze: phraze => dispatch(actions.addPhraze(phraze)),
  onGetPhrazesByCategory: category =>
    dispatch(actions.getPhrazesByCategory(category))
});

export default connect(
  null,
  mapDispatchToProps
)(NewPhrazeScreen);
