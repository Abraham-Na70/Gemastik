// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

import Home from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { JobView } from "./pages/JobView";
import { CompanyView } from "./pages/CompanyView";
import { AddJob } from "./pages/AddJob";
import { AddCompany } from "./pages/AddCompany";
import { JobApply } from "./pages/JobApply";
import { Chat } from "./pages/Chat";

function App() {
	// const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/job/:id" element={<JobApply />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/job/:id" element={<JobView />} />
					<Route path="/dashboard/job/add" element={<AddJob />} />
					<Route path="/dashboard/company/:id" element={<CompanyView />} />
					<Route path="/dashboard/company/add" element={<AddCompany />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/chat/:id" element={<Chat />} />

					{/* Add more routes here as needed */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
