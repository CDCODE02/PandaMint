import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { cx } from "../../../Utils/classnames";
import Label from "../../UI/Text/Label/Label";
import classes from "./SwapField.module.css";

const SwapField = (props) => {
  const {
    tokenIcon,
    tokenName,
    leftLabel,
    available,
    value,
    onChange,
    valueText,
    inputRef = null,
  } = props;

  const theme = useTheme();

  const [onFocus, setOnFocus] = useState(false);

  const handleFocus = () => {
    setOnFocus(!onFocus);
  };

  const handleChange = (e) => {
    onChange(e.target.value.replace(",", "."));
  };

  const setMax = (value) => {
    onChange(value);
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Label text={leftLabel} />
        <Label text={"Available: " + available} />
      </div>
      <div
        className={cx(classes.content, valueText ? classes.noPaddingRight : "")}
        style={{
          transitionDuration: ".3s",
          border: onFocus
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.background.border}`,
        }}
      >
        <div className={classes.token}>
          <img src={tokenIcon} alt="token icon" />
          <p
            style={{
              color: theme.palette.text.primary,
            }}
          >
            {tokenName}
          </p>
        </div>
        <div className={classes.value}>
          <input
            value={value}
            onChange={handleChange}
            placeholder={0}
            onFocus={handleFocus}
            onBlur={handleFocus}
            ref={inputRef}
          />
          {valueText && (
            <Button
              className={classes.max}
              style={{
                color: theme.palette.text.special,
              }}
              onClick={() => setMax(available)}
            >
              {valueText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapField;
