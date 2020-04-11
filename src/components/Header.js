import React from 'react';
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap'
function Header() {
    return (
        <div>
            <Navbar color="light" expand="md" className="mb-3">
            <NavbarBrand>Checklist</NavbarBrand>
            </Navbar>
        </div>
    )
}
export default Header