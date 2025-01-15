"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "react-feather";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.setItem('isLoggedIn', 'false');
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300  ${
        scrolled ? "bg-[#318aff] bg-opacity-10 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-8 text-xl flex gap-6 items-center justify-center py-4 text-white`}>

        <nav className="flex gap-6">
          <a href="/" className="cursor-pointer">Home</a>
          <a href="#about" className="cursor-pointer">About</a>
          <a href="#leaderboards" className="cursor-pointer">Leaderboards</a>
          <a href="#contact" className="cursor-pointer">Contact</a>
        </nav>

        {isLoggedIn ? (
          <div className="flex gap-4">
            <a href="/avatar">Gym</a>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <a
            href="/login"
            className={`bg-transparent border-white border-2 font-semibold px-6 py-2 rounded-lg text-white`}
          >
            Login
          </a>
        )}

        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>

      {isOpen && (
        <div className="bg-black text-white text-xl flex flex-col gap-4 p-4 md:hidden">
          <a href="/" className="cursor-pointer">Home</a>
          <a href="#about" className="cursor-pointer">About</a>
          <a href="#leaderboards" className="cursor-pointer">Leaderboards</a>
          <a href="#contact" className="cursor-pointer">Contact</a>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      )}
    </header>
  );
}
