import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';

const Section = ({ title }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        
        <section className="section">
            <Card onClick={!open ? toggleOpen : ""}>
                <Card.Body>
                    <Card.Title 
                        >
                        {title}</Card.Title>
                    <Collapse in={open}>
                        <Card.Text>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                            <Button variant="primary" onClick={toggleOpen}>Enregistrer</Button>
                        </Card.Text>
                    </Collapse>
                </Card.Body>
            </Card>
        </section>
    );
}

export default Section;