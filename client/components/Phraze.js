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
    if (isPlaying) {
      this.setState({
        soundState: PhraseSoundState.PLAYING
      });
    }
  };

  playPhraseSound = async soundUri => {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(
        {
          uri:
            "https://ia800406.us.archive.org/23/items/PeterHernandezPodcastAudioPlaceholder/AudioPlaceholder.mp3"
        },
        {},
        true
      );
      soundObject.setOnPlaybackStatusUpdate(this._onSoundPlaybackStatusUpdate);
      await soundObject.playAsync();
    } catch (error) {
      this.setState({
        soundState: PhraseSoundState.ERROR
      });
    }
  };

  setupSoundBtn = phraseItem => {
    const inactiveButtonColor = Colors.button.inactive;

    switch (this.state.soundState) {
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
              this.playPhraseSound(phraseItem.sound);
              this.setState({
                soundState: PhraseSoundState.BUFFERING
              });
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
            onPress={() =>
              item.public
                ? onPressCheckBox(item.key, "public")
                : onPressCheckBox(item.key, "public", item)
            }
            icon={currentButtonsState.public.icon}
            color={currentButtonsState.public.color}
          />
          <CardButtonIcon
            onPress={() => onPressCheckBox(item.key, "phrazed")}
            icon={currentButtonsState.learned.icon}
            color={currentButtonsState.learned.color}
          />
          {soundBtn}
          <CardButtonIcon
            onPress={() => onPressCheckBox(item.key, "favorite")}
            icon={currentButtonsState.favorite.icon}
            color={currentButtonsState.favorite.color}
          />
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
