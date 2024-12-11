// pages/index.tsx
"use client"; // Add this line at the top

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface HomePageData {
  home: { title: string; content: string };
  about: { title: string; content: string };
  services: { title: string; items: { name: string; description: string }[] };
  contact: { title: string; content: string; email: string; phone: string };
}

export default function Home() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://python-mysql-http.onrender.com/api/homepage');
      const jsonData: HomePageData = await res.json();
      setData(jsonData);
      setLoading(false);
    }
    fetchData();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return <p>Error loading data</p>;
  }

  return (
    <div>
      <Head>
        <title>{data.home.title}</title>
        <meta name="description" content={data.home.content} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <main>
        <h1>{data.home.title}</h1>
        <p>{data.home.content}</p>
      </main>

      <Fab
        color="primary"
        aria-label="scroll down to contact"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={scrollToContact}
      >
        <KeyboardArrowDownIcon />
      </Fab>

      <footer id="contact">
        <h2>{data.contact.title}</h2>
        <p>{data.contact.content}</p>
        <p>Email: {data.contact.email}</p>
        <p>Phone: {data.contact.phone}</p>
      </footer>

      <style jsx>{`
        /* ... (styles remain the same) */
      `}</style>
    </div>
  );
}