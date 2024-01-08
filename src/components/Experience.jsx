import {
  Environment,
  CameraControls,
  Text,
  MeshReflectorMaterial,
  RenderTexture,
  Float,
  useFont,
} from "@react-three/drei";
import { useAtom } from "jotai";
import { Color, Group } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils";
import { useEffect, useRef} from "react";
import { useFrame } from "@react-three/fiber";
import { Winter } from "./Winter";
import { currentPageAtom } from "./UI";

const  bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.6);

export const Experience = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraStore = useRef();
  const textMaterial = useRef();
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  useFrame((_, delta) => {
    textMaterial.current.opacity = lerp(
      textMaterial.current.opacity,
      currentPage === "home" || currentPage === "intro" ? 1 : 0,
      delta * 1.5
    );
  });

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 0.8;
    setTimeout(() => {
      setCurrentPage("home");
    }, 1200);
    fitCamera();
  };

  const fitCamera = async () => {
    if (currentPage === "store") {
      console.log(currentPage)
      controls.current.smoothTime = 0.8;
      controls.current.fitToBox(meshFitCameraStore.current, true);
    } else {
      console.log(currentPage)
      controls.current.smoothTime = 1.6;
      controls.current.fitToBox(meshFitCameraHome.current, true);
    }
  }

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    fitCamera();

    window.addEventListener("resize", fitCamera);
    return () => window.addEventListener("resize", fitCamera);
  }, [currentPage])
  

  return (
    <>
      <CameraControls ref={controls} />
      <mesh ref={meshFitCameraHome} position-z={0.5} visible={false}>
        <boxGeometry args={[6,4,2]}/>
        <meshBasicMaterial color={"orange"} transparent opacity={0.5}/>
      </mesh>
      <Text
        font={"fonts/Raleway-Black.ttf"}
        position={[-1.3, -1.5, 1]}
        lineHeight={1}
        textAlign="center"
        rotation={[degToRad(0), degToRad(65), 0]}
        scale={1}
        anchorY={"bottom"}
      >
        HINTERLAND {"\n"} HOLIDAYS
        <meshBasicMaterial ref={textMaterial} color={bloomColor} toneMapped={false} >
          <RenderTexture attach={"map"}>
            <color attach={"background"} args={["#ccc"]}/>
            <Environment preset="sunset"/>
            <Float floatIntensity={4} rotationIntensity={5}>
              <Winter scale={2} rotation={[-degToRad(5),degToRad(140),0]} position-y={-0.5} />
            </Float >
          </RenderTexture>
        </meshBasicMaterial>
      </Text>

      <group
        rotation={[degToRad(5), degToRad(10), 0]}
        position={[2.8, 0.5, 0]}
      >
        <Winter scale={1} html />
        <mesh ref={meshFitCameraStore} visible={false}>
          <boxGeometry args={[4, 3, 4]} rotation={[180,180,1]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </group>

      <mesh position-y={-1.48} rotation-x={-Math.PI/2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={"#333"}
          metalness={0.5}
        />
      </mesh>

      <Environment preset="sunset" />
    </>
  );
};

useFont.preload("fonts/Raleway-Black.ttf");