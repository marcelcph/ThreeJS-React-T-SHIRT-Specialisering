import React, { useState, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Canvas = () => {
  const canvasScenen = useState();
  const [valgteFarve1, sætValgteFarve1] = useState(0xcc3333); // Farve for Cube035 (Hoved)
  const [valgteFarve2, sætValgteFarve2] = useState(0xffffff); // Farve for Cube035_1 (Krop)
  const [rotation, setRotation] = useState(false); // State for rotation

  useEffect(() => {
    const scene = new THREE.Scene(); // Scene til modellen 
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 100); // Kamera
    const renderer = new THREE.WebGLRenderer({ canvas: canvasScenen.current }); // Canvas-elementet
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75); // Størrelse på canvas
    renderer.setClearColor(0x333366); // Farve på baggrund

    const controls = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 30;
    camera.position.y = 2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Sætter lysstyrken til 0.5
    scene.add(ambientLight);

    const loader = new GLTFLoader();

    loader.load('./Mushnub_Evolved.gltf', function (gltf) {
      const model = gltf.scene;
      scene.add(gltf.scene);
      // console.log(gltf.scene);
      model.getObjectByName('Cube035').material.color.setHex(valgteFarve1);
      model.getObjectByName('Cube035_1').material.color.setHex(valgteFarve2);
    }, undefined, function (error) {
      console.error(error);
    });

    function animate() {
      if (rotation) {
        // Roter modellen omkring Y-aksen
        scene.rotation.y += 0.01;
      }
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
;
  }, [valgteFarve1, valgteFarve2, rotation]);

  const håndterFarveSkift1 = (event) => {
    const farveVærdi = parseInt(event.target.value.replace('#', '0x'));
    sætValgteFarve1(farveVærdi);
  };

  const håndterFarveskift2 = (event) => {
    const farveVærdi = parseInt(event.target.value.replace('#', '0x'));
    sætValgteFarve2(farveVærdi);
  };

  const håndterRotationKnap = () => {
    setRotation(!rotation);
  };

  return (
    <>
      <div className='flex justify-center'>
        <canvas ref={canvasScenen} /> {/* Ref til canvas-elementet */}
      </div>
      <div className="flex justify-center bg-blue-700 p-5 rounded-lg mx-[500px]">
        <div className="flex items-center justify-center">
          <h1 className="font-bold mr-2">Hoved</h1>
          <input
            type="color"
            value={`#${valgteFarve1.toString(16)}`}
            onChange={håndterFarveSkift1}
            style={{ marginTop: '10px' }}
          /> {/* Color picker input for Cube035 */}
        </div>
        <div className="flex items-center justify-center ml-8">
          <h1 className="font-bold mr-2">Krop</h1>
          <input
            type="color"
            value={`#${valgteFarve2.toString(16)}`}
            onChange={håndterFarveskift2}
            style={{ marginTop: '10px' }}
          /> {/* Color picker input for Cube035_1 */}
        </div>
        <div className="flex items-center justify-center ml-8">
          <button onClick={håndterRotationKnap} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {rotation ? 'Stop Rotation' : 'Start Rotation'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Canvas;
