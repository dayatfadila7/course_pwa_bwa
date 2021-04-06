import React from "react";

import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Clients from "./components/Clients.js";
import Modal from "./components/Modal.js";
import Footer from "./components/Footer.js";

function App() {
    const [showModal, setShowModal] = React.useState(false);
    const [items, setItems] = React.useState([]);

    function handleShowModal(event) {
        setShowModal(!showModal);
    }

    React.useEffect(function () {
        (async function () {
            const response = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc', {
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json",
                    "x-api-key": process.env.REACT_APP_APIKEY,
                }
            });
            const {nodes} = await response.json();
            setItems(nodes);
        })()
    }, [])
    return (
        <>
            <Header/>
            <Hero handleShowModal={handleShowModal}/>
            <Browse/>
            <Arrived items={items}/>
            <Clients/>
            <Footer/>
            {showModal && <Modal handleShowModal={handleShowModal}/>}
        </>
    );
}

export default App;
