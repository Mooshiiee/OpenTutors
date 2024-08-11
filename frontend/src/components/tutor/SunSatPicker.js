import * as React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function SunSatPicker() {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup  
      color="success"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="weekday"
    >
      <ToggleButton value="Sun" aria-label="sunday">
        Sun
      </ToggleButton>
      <ToggleButton value="Mon" aria-label="monday">
        Mon
      </ToggleButton>
      <ToggleButton value="Tues" aria-label="tuesday">
        Tues
      </ToggleButton>
      <ToggleButton value="Wed" aria-label="wednesday">
        Wed
      </ToggleButton>
      <ToggleButton value="Thur" aria-label="thursay">
        Thur
      </ToggleButton>
      <ToggleButton value="Fri" aria-label="friday">
        Fri
      </ToggleButton>
      <ToggleButton value="Sat" aria-label="saturday">
        Sat
      </ToggleButton>

    </ToggleButtonGroup>
  );
}