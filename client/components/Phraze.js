import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Expo from "expo";

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButtonIcon
} from "./../material-cards-custom";

import BreathingCardButtonIcon from "./BreathingCardButtonIcon";

import Colors from "../config/colors";

PhraseSoundState = {
  PLAYING: "PLAYING",
  ERROR: "ERROR",
  READY: "READY",
  BUFFERING: "BUFFERING"
};

class Phraze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      soundState: PhraseSoundState.READY
    };
  }

  _onSoundPlaybackStatusUpdate = ({ isPlaying, isBuffering }) => {
    console.log("is playing: " + isPlaying);
    if (isPlaying) {
      this.setState({
        soundState: PhraseSoundState.PLAYING
      });
    } else {
      this.setState({
        soundState: PhraseSoundState.READY
      });
    }
  };

  playPhraseSoundObject = async sound => {
    try {
      await sound.replayAsync();
    } catch (error) {
      this.setState({
        soundState: PhraseSoundState.ERROR
      });
    }
  };

  playPhraseSound = async soundSource => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(soundSource, {}, true);
      soundObject.setOnPlaybackStatusUpdate(this._onSoundPlaybackStatusUpdate);
      await soundObject.playAsync();
    } catch (error) {
      this.setState({
        soundState: PhraseSoundState.ERROR
      });
    }
  };

  setupSoundBtn = phraseItem => {
    let { soundState } = this.state;
    soundState = phraseItem.sound ? soundState : PhraseSoundState.ERROR;

    const inactiveButtonColor = Colors.button.inactive;

    switch (soundState) {
      case PhraseSoundState.ERROR:
        return (
          <CardButtonIcon
            onPress={() => {}}
            icon="volume-off"
            color={inactiveButtonColor}
          />
        );

      case PhraseSoundState.PLAYING:
        return (
          <CardButtonIcon
            onPress={() => {}}
            icon="volume-up"
            color={inactiveButtonColor}
          />
        );

      case PhraseSoundState.BUFFERING:
        return (
          <BreathingCardButtonIcon
            onPress={() => {}}
            icon="volume-mute"
            color={inactiveButtonColor}
          />
        );

      //PhraseSoundState.READY
      default:
        return (
          <CardButtonIcon
            onPress={() => {
              if (phraseItem.sound.object) {
                this.playPhraseSoundObject(phraseItem.sound.object);
              } else {
                this.playPhraseSound({ uri: phraseItem.sound.path });
                this.setState({
                  soundState: PhraseSoundState.BUFFERING
                });
              }
            }}
            icon="volume-mute"
            color={inactiveButtonColor}
            animated={false}
          />
        );
    }
  };

  render() {
    const { item, onPressCheckBox, onPressPhraze } = this.props;

    const inactiveButtonColor = Colors.button.inactive;
    const activeButtonColor = Colors.mainColor.light;
    const activeStarColor = Colors.icon.yellow;

    const currentButtonsState = {
      public: {
        color: item.public ? activeButtonColor : inactiveButtonColor,
        icon: "people"
      },
      learned: {
        color: item.phrazed ? activeButtonColor : inactiveButtonColor,
        icon: item.phrazed ? "check-box" : "check-box-outline-blank"
      },
      favorite: {
        color: item.favorite ? activeStarColor : inactiveButtonColor,
        icon: item.favorite ? "star" : "star-border"
      }
    };

    const foreign = item.translated ? (
      <CardContent text={item.translated} />
    ) : (
      <View />
    );

    const soundBtn = this.setupSoundBtn(item);

    return (
      <Card>
        <CardTitle title={item.phraze} subtitleAbove={true} />
        {foreign}
        <CardAction separator={false} inColumn={false} style={styles.actions}>
          <CardButtonIcon
            onPress={() => onPressCheckBox(item.key, "favorite")}
            icon={currentButtonsState.favorite.icon}
            color={currentButtonsState.favorite.color}
          />
          {soundBtn}
          <CardButtonIcon
            onPress={() => onPressPhraze(item)}
            icon="create"
            color={inactiveButtonColor}
          />
        </CardAction>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10
  }
});

export default Phraze;
