import React, {useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {connectField, filterDOMProps} from 'uniforms';

export default connectField(
    ({
       InputLabelProps,
       disabled,
       error,
       errorMessage,
       helperText,
       label,
       labelProps,
       onChange,
       showInlineError,
       value,
       fullWidth,
       margin,
       ...props
     }) => {
      const [selectedDate, setSelectedDate] = useState(value)
      return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disabled={!!disabled}
                error={!!error}
                label={label}
                helperText={
                  (error && showInlineError && errorMessage) ||
                  helperText
                }
                InputLabelProps={{...InputLabelProps, ...labelProps}}
                onChange={date => {
                  setSelectedDate(date)
                  onChange(date)
                }}
                value={selectedDate}
                {...filterDOMProps(props)}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth={fullWidth || true}
                margin={margin || 'dense'}
            />
          </MuiPickersUtilsProvider>
      );
    },
);
