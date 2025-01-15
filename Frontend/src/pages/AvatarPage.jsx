import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../components/Experience";
import { UI } from "../components/UI";
import { ChatProvider } from "../hooks/useChat";
function App() {
  return (
    <>
    <ChatProvider>
      <Loader />
      <Leva hidden />
      <UI />
      <div style={{ width: '100vw', height: '100vh', overflow:'hidden'}}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <Experience />
      </Canvas>
      </div>
    </ChatProvider>
    </>
  );
}

export default App;
