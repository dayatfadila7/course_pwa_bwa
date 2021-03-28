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

    function handleShowModal(event) {
        setShowModal(!showModal);
    }
    return (
        <>
            <Header />
            <Hero handleShowModal={handleShowModal} />
            <Browse />
            <Arrived />
            <Clients />
            <Footer />
            {showModal && <Modal handleShowModal={handleShowModal} />}
        </>
    );
}

export default App;
