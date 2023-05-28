import React, { useState, useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

const Canvas = () => {
  const canvasScenen = useRef(null);
  const [valgteFarve, sætvalgteFarve] = useState(0x00ff00);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 300);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasScenen.current });
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);

    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: valgteFarve });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
    };
  }, [valgteFarve]);

  const handleColorChange = (event) => {
    const farveVærdi = parseInt(event.target.value.replace('#', '0x'));
    sætvalgteFarve(farveVærdi);
  };

  return (
    <>
      <canvas ref={canvasScenen} /> {/* Ref til canvas-elementet */}
      <input type="color" value={`#${valgteFarve.toString(16)}`} onChange={handleColorChange} style={{ marginTop: '10px' }} /> {/* Color picker input */}
    </>
  );
};

export default Canvas;
