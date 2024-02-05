import React, {useEffect, useState} from "react";
import {getActiveTabURL} from './utils.js';
import icon from '../assets/delete.png';
import './app.css';
let activeTab;
export default function App() {
	const [element, setElement] = useState([]);
	useEffect(() => {
		const fetchTabs = async () => {
			activeTab = await getActiveTabURL();
			console.log('got tab id');
			let data = {
				id : "popup",
				type: "fetch",
				data: activeTab.id
			};
			chrome.runtime.sendMessage(data,(response) => {
				response = response || [];
				setElement(response);
			});
	   };
	   fetchTabs();
	},[]);
	const handleClick = (item) => {
		if (activeTab.id) {
			let data = {
				id: "popup",
				type: "delete",
				data: item,
				tab: activeTab.id
			}
			chrome.runtime.sendMessage(data,(response) => {
				setElement(response);
			});
		}
	}
	const list = element.map((ele) => {
		return <div className="item"><span>{ele}</span> <img className="image" src={icon} onClick={(e) => {e.preventDefault();handleClick(ele)}} /></div>
	});
 return (
	<>
		<div>Clicked Items</div>
		{list ? <div className="container">{list}</div> : null}
	</>
 );
};