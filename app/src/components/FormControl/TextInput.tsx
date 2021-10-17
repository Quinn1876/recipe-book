import React, { useCallback } from 'react';
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

export type InputTypes = 'text' | 'email' | 'password' | 'number';
export type onChangeHandler<T> = (value: T) => void;
export type onKeyPressHandler = (event: { key: string }) => void;

interface TextInputProps<T> {
  value: T;
  autoFocus?: boolean;
  fullWidth?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  multiline?: boolean;
  name?: string;
  onChange: (value: T) => void;
  onKeyPress?: onKeyPressHandler;
  required?: boolean;
  type?: InputTypes;
  label: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  className?: string;
}

function TextInput<T>({
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
  inputRef,
  className,
}: TextInputProps<T>): React.ReactElement | null {
  const classes = useStyles();
  const handleChange = useCallback((event) => onChange(event.target.value), [onChange]);
  return (
    <FormControl
      className={`${classes.root} ${className}`}
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
        onChange={handleChange}
        value={value}
        multiline={multiline}
        type={type}
        onKeyPress={onKeyPress}
        inputRef={inputRef}
      />
    </FormControl>
  );
}

export default TextInput;
