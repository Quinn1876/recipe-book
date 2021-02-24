import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
  },
  textField: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    borderColor: theme.palette.primary.main,
  },
}));

export type InputTypes = 'text' | 'email' | 'password';
export type onChangeHandler = (event: { target: { value: string } }) => void;
export type onKeyPressHandler = (event: { key: string }) => void;

interface TextInputProps {
  value: string;
  autoFocus?: boolean;
  fullWidth?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  multiline?: boolean;
  name?: string;
  onChange: onChangeHandler;
  onKeyPress?: onKeyPressHandler;
  required?: boolean;
  type?: InputTypes;
  label: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  autoFocus = false,
  fullWidth = false,
  endAdornment = null,
  startAdornment = null,
  multiline = false,
  name = '',
  onChange,
  onKeyPress,
  required = false,
  type = 'text',
  label,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      className={classes.root}
      fullWidth={fullWidth}
      required={required}
    >
      <InputLabel>{label}</InputLabel>
      <Input
        className={classes.textField}
        name={name + '-input'}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        onChange={onChange}
        value={value}
        multiline={multiline}
        type={type}
        onKeyPress={onKeyPress}
      />
    </FormControl>
  );
};

export default TextInput;
