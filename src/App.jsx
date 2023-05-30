import React, { useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App() {

  return (
    <div className="bg-[#333366] h-screen">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl text-center">ThreeJS & React</h1>
      <Canvas />
    </div>
  );
}

export default App;
