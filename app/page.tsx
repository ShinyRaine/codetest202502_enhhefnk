import { Box, Divider } from "@mui/material";
import style from "./page.module.css";
import Link from "next/link";
import SearchInput from "./components/search-input";

export default function Home() {
  
  return (
    <main className={style.page}>
      <SearchInput />
      <Box sx={{display: 'flex', gap: '12px'}}>
        <Link href="/search/history">Search History</Link>
        <Divider orientation="vertical" flexItem />
        <Link href="/saved-course">Saved Course</Link>
        <Divider orientation="vertical" flexItem />
        <Link href="/my-applications">My Applications</Link>
      </Box>
    </main>
  );
}
