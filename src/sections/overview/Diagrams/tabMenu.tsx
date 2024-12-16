import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GridDemo from './BarChart';

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log("bbbb");
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ position: 'relative', left: '620px', bottom: '180px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>


        <Box sx={{ position: 'relative', left: '500px', width: '100%', bottom: '150px' }}>
          {value === 'one' &&
            <Box sx={{ position: 'relative', right: '550px', top: '200px' }}>
              <GridDemo />
            </Box>}
        </Box>


        <Box sx={{ position: 'relative', left: '500px', width: '100%', bottom: '150px' }}>
          {value === 'two' &&
            <Box sx={{ position: 'relative', right: '550px', top: '200px' }}>
              <GridDemo />
            </Box>}
        </Box>


        <Box sx={{ position: 'relative', left: '500px', width: '100%', bottom: '150px' }}>
          {value === 'three' &&
            <Box sx={{ position: 'relative', right: '550px', top: '200px' }}>
              <GridDemo />
            </Box>}
        </Box>

      </Box>
    </Box>
  );
}
