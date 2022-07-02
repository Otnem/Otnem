	import * as React from "react";
	import Login from "./pages/Login";
	import { Routes, Route } from "react-router-dom";
	import Register from './pages/Register'
	import Profile from './pages/Profile';
	import Feed from './pages/Feed';
	import './index.css'
	import Search from './pages/Search'
	import MobileChat from "./pages/MobileChat";
	import Chat from "./pages/Chat";
	import Upload from "./pages/Upload";
	import Notifrom from './pages/Noti';
	import Noti from "./pages/Noti";
	import ViewPage from './pages/ViewPage'; 
	import Construction from "./pages/construction";
	import Settings from "./pages/Settings";
	import Red from './pages/red'


	function App() {
	return (
	<div className="App ">
		<Routes>
			<Route path="/" element={<Feed />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/feed" element={<Feed />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/search" element={<Search/>} />
			<Route path="/red" element={<Red/>} />
			<Route path="/chat" element={<Chat/>} />
			<Route path="/upload" element={<Upload/>} />
			<Route path="/construction" element={<Construction/>} />
			<Route path="/user" element={<MobileChat/>} />
			<Route path="/notification" element={<Noti/>} />
			<Route path="/post" element={<ViewPage/>} />
			<Route path="/settings" element={<Settings	/>} />

		</Routes>
	</div>
	);
	}

	export default App