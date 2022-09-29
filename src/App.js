import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Intro from './Components/Intro/Intro';
import Contact from './Components/Contact/Contact';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AbsSummarizer from './Components/AbsSummarizer/AbsSummarizer';
import ExtSummarizer from './Components/ExtSummarizer/ExtSummarizer';

function App() {
  return (
    <>
      <Navbar/>
      <Intro/>
      <AbsSummarizer/>
      <ExtSummarizer/>
      <Contact></Contact>
    </>
  );
}

export default App;
