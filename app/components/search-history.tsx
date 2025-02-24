'use client'
import { Box, Drawer, IconButton, LinearProgress, List, MenuItem, Typography } from '@mui/material';
import { Suspense, use, useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import Link from 'next/link';

function HistroyList({items}: {items: Promise<string[]>}) {
  const history = use(items)
  return <List>
  {history.map(value => {
    const searchParams = new URLSearchParams(value)
    const text = searchParams.get('text')
    return <MenuItem key={value}>
      <Link style={{width: '100%'}} href={`/search?${value}`}>
        <Typography>{text}</Typography>
      </Link>
      </MenuItem>
  })}
  </List>
}


export default function SearchHistory() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Suspense fallback={<LinearProgress />}>
        <HistroyList items={fetch('/api/save-search').then(res => res.json())} />
      </Suspense>
    </Box>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}><HistoryIcon /></IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
