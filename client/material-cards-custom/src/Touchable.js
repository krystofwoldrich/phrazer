import React from "react";
import PropTypes from "prop-types";
import {
  ViewPropTypes,
  TouchableOpacity,
  TouchableNativeFeedback,
  View
} from "react-native";
import { IS_ANDROID, IS_LT_LOLLIPOP, noop } from "./utils";

const Touchable = ({ onPress, style, children, animated }) => {
  if (IS_ANDROID && !IS_LT_LOLLIPOP) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={onPress}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    let tmpAnimated = animated;

    if (animated === undefined) {
      tmpAnimated = true;
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={style}
        activeOpacity={tmpAnimated ? 0.2 : 1}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired
};

Touchable.defaultProps = {
  onPress: noop,
  style: {}
};

export default Touchable;
