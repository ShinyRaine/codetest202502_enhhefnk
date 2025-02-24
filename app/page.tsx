import { Box, Divider } from "@mui/material";
import Link from "next/link";
import SearchInput from "./components/search-input";

export default function Home() {
  
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100',
      width: '100%',
      padding: '24px',
      paddingTop: '20%',
      gap: '24px'
    }}>
      <SearchInput />
      <Box sx={{display: 'flex', gap: '12px'}}>
        <Link href="/saved-course">Saved Course</Link>
        <Divider orientation="vertical" flexItem />
        <Link href="/my-applications">My Applications</Link>
      </Box>
    </main>
  );
}
