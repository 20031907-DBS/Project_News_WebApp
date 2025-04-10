import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex bg-violet-200">
      <Sidebar />

      <div className=" flex-1 min-h-screen bg-blue-200 flex items-center justify-center">
        <h1 className="text-3xl font-bold">News Container</h1>
      </div>
    </div>
  );
}

export default App;
