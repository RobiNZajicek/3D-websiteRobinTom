// File: ThreeDModel.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface ThreeDModelProps {
  modelURL: string;
}

const ThreeDModel: React.FC<ThreeDModelProps> = ({ modelURL }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modelURL) return;
    const fileURL = modelURL;

    // Vytvoření scény
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Nastavení rozměrů rendereru
    const width = window.innerWidth * 0.66; // Předpokládáme, že tato komponenta zabírá 66% šířky
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // Přiblížíme kameru pro detailnější náhled
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    // Osvětlení
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Načtení modelu pomocí STLLoader
    if (fileURL.endsWith(".stl") || fileURL.endsWith(".obj")) {
      const loader = new STLLoader();
      loader.load(
        fileURL,
        (geometry) => {
          const material = new THREE.MeshLambertMaterial({ color: 0x156289 });
          const mesh = new THREE.Mesh(geometry, material);

          // Centrovat a škálovat model
          const bbox = new THREE.Box3().setFromObject(mesh);
          const center = bbox.getCenter(new THREE.Vector3());
          mesh.position.sub(center);
          const size = bbox.getSize(new THREE.Vector3());
          const maxDimension = Math.max(size.x, size.y, size.z);
          // Zvýšíme měřítko pro detailnější zobrazení
          const scaleFactor = 2;
          mesh.scale.set(scaleFactor / maxDimension, scaleFactor / maxDimension, scaleFactor / maxDimension);

          scene.add(mesh);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.error("Chyba při načítání modelu:", error);
        }
      );
    } else {
      console.error("Nepodporovaný formát modelu.");
    }

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const onWindowResize = () => {
      const newWidth = window.innerWidth * 0.66;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      URL.revokeObjectURL(fileURL);
    };
  }, [modelURL]);

  return <div ref={mountRef}></div>;
};

export default ThreeDModel;
