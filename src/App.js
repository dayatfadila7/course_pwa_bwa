import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Clients from "./components/Clients.js";
import Modal from "./components/Modal.js";
import Footer from "./components/Footer.js";
import Offline from "./components/Offline";
import Splash from "./pages/Splash.js";
import Profile from "./pages/Profile";

function App() {
    const [showModal, setShowModal] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

    const [isLoading, setIsLoading] = React.useState(true);


    function handleOfflineStatus() {
        setOfflineStatus(!navigator.onLine);
    }

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

            const script = document.createElement("script");
            script.src = "/carousel.js";
            script.async = false;
            document.body.appendChild(script);

        })()

        handleOfflineStatus();
        window.addEventListener("online", handleOfflineStatus);
        window.addEventListener("offline", handleOfflineStatus);

        setTimeout(function () {
            setIsLoading(false);
        }, 3000)

        return function () {
            window.removeEventListener("online", handleOfflineStatus);
            window.removeEventListener("offline", handleOfflineStatus);
        };

    }, [offlineStatus])
    return (
        <>
            {isLoading === true ? <Splash/> :
                (<>
                    {offlineStatus && <Offline/>}
                    <Header/>
                    <Hero handleShowModal={handleShowModal}/>
                    <Browse/>
                    <Arrived items={items}/>
                    <Clients/>
                    <Footer/>
                    {showModal && <Modal handleShowModal={handleShowModal}/>}
                </>)
            }
        </>

    );
}

export default function Routes(){
    return(
        <Router>
            <Route path="/" exact component={App}></Route>
            <Route path="/profile" exact component={Profile}></Route>
        </Router>
    )
};
