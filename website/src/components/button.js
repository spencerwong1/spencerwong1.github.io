import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BasicButtons = () => {
  return (
    <div>
        <Stack spacing={2} direction="row">
            <Button variant="text">Text</Button>
        </Stack>
    </div>
  );
}

export default BasicButtons;