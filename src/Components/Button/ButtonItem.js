import React, { Component } from "react";
import "./ButtonStyle.css";
import classnames from "classnames";

class ButtonItem extends Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      isHovered: false,
      isFocused: false
    };
  }

  getColorClass(color, type) {
    const colors = {
      red: {
        active: "button_red",
        hover: "button_red--hover"
      },
      green: {
        active: "button_green",
        hover: "button_green--hover"
      },
      blue: {
        active: "button_blue",
        hover: "button_blue--hover"
      },
      black: {
        active: "button_black",
        hover: "button_black--hover"
      },
      orange_transparent: {
        active: "orangeTransparent",
        hover: "orangeTransparent--hover",
        focus: "orangeTransparent--focus"
      }
    };

    if (type === "active") {
      return colors[color].active;
    } else if (type === "hover") {
      return colors[color].hover;
    } else if (type === "focus") {
      return colors[color].focus;
    }
  }

  handleHover() {
    this.setState(prevState => {
      return {
        ...prevState,
        isHovered: !prevState.isHovered
      };
    });
  }

  handleFocus() {
    this.setState(prevState => {
      return {
        ...prevState,
        isFocused: !prevState.isFocused
      };
    });
  }

  render() {
    const {
      onClick: handleClick,
      color,
      block,
      disabled: isDisabled,
      style: inlineStyles,
      children: label,
      additionalClasses
    } = this.props;
    const { isHovered, isFocused } = this.state;
    return (
      <button
        className={classnames(
          {
            button: !block,
            "button--block": block,
            [this.getColorClass(color, "hover")]: isHovered,
            [this.getColorClass(color, "focus")]: isFocused
          },
          this.getColorClass(color, "active"),
          additionalClasses
        )}
        style={inlineStyles}
        onMouseOver={this.handleHover}
        onMouseOut={this.handleHover}
        onFocus={this.handleFocus}
        onClick={e => {
          this.handleFocus();
          handleClick(e);
        }}
        {...isDisabled && { disabled: true }}>
        {label}
      </button>
    );
  }
}

export default ButtonItem;
