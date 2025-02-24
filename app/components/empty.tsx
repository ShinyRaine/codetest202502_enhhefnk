import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Typography } from '@mui/material';

export default function Empty() {
  return (
    <Typography variant='h5' sx={{display: 'flex', mt: '24px', alignItems:'center', justifyContent: 'center'}}>
      <SearchOffIcon /> No Result
    </Typography>
  )
}
