import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { clipboard, ipcRenderer } from 'electron';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';

type Content = string;

interface ClippingProps {
  content: Content;
}

const writeToClipboard = (content: Content) => {
  clipboard.writeText(content);
};

const Clipping = ({ content }: ClippingProps) => {
  return (
    <div className="clippings-list-item">
      <div className="clipping-text">
        <pre>
          <code>{content}</code>
        </pre>
      </div>
      <div className="clipping-controls">
        <Button onClick={() => writeToClipboard(content)}>
          &rarr; Clipboard
        </Button>{' '}
        <Button onClick={() => {}}>Update</Button>
      </div>
    </div>
  );
};

const initialClippingsState = [
  {
    content: 'Lol',
    id: 123,
  },
  {
    content: 'ehey',
    id: 1233,
  },
];

const Clipper = () => {
  const [clippings, setClippings] = React.useState(initialClippingsState);

  React.useEffect(() => {
    const addClipping = () => {
      const content = clipboard.readText();
      const id = Date.now();

      const clipping = { id, content };
      setClippings([clipping, ...clippings]);
    };
    ipcRenderer.on('create-new-clipping', addClipping);
  }, [clippings]);

  return (
    <Container fluid>
      <Row className="controls">
        <Button type="button">Copy from Clipboard</Button>
      </Row>
      <Row className="content">
        <div className="clippings-list">
          {clippings.map((clipping) => (
            <Clipping content={clipping.content} key={clipping.id} />
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Clipper} />
      </Switch>
    </Router>
  );
}
