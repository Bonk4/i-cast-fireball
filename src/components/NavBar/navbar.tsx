import React from "react";

export class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="/Fireball.svg" className="btn-fireball-logo me-2" alt="fireball logo"></img>
                        <span className="mt-1">I Cast Fireball!</span>
                    </a>

                    <span className="navbar-text">
                        Simple Initiative Tracking
                    </span>
                </div>
            </nav>
        );
    }
}