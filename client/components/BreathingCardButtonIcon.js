import React, { Component } from "react";
import { Animated, Easing } from "react-native";
import CardButtonIcon from "./../material-cards-custom/CardButtonIcon";

class BreathingCardButtonIcon extends Component {
  state = {
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  render() {
    const { onPress, icon, color, iconStyle, style, animated } = this.props;
    const { opacity } = this.state;

    const containerStyle = {
      opacity
    };

    return (
      <Animated.View style={containerStyle}>
        <CardButtonIcon
          onPress={onPress}
          icon={icon}
          color={color}
          style={style}
          iconStyle={iconStyle}
          animated={animated}
        />
      </Animated.View>
    );
  }
}

export default BreathingCardButtonIcon;
