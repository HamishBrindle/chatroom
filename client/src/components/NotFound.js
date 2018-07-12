import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound is our 404 page.
 */
const NotFound = () => (
    <div className="container center">
        <h1 className="app-header">404</h1>
        <h2>Page Not Found!</h2>
        <center><Link to="/">Return to Home Page</Link></center>
    </div>
);

export default NotFound;