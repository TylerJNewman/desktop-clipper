import React from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

interface AlertComponentProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function AlertComponent({ show, setShow }: AlertComponentProps) {
  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Hello World!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me!
          </Button>
        </div>
      </Alert>
    </>
  );
}

function AlertDismissible() {
  const [show, setShow] = React.useState(true);

  return (
    <>
      {show && <AlertComponent show={show} setShow={setShow} />}
      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={AlertDismissible} />
      </Switch>
    </Router>
  );
}
