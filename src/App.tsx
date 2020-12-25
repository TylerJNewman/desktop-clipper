import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { clipboard, ipcRenderer } from 'electron';
import { Button, Container, Row } from 'react-bootstrap';

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
        <pre className="pt-3">
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

  const addClipping = React.useCallback(() => {
    const content = clipboard.readText();
    const id = Date.now();

    const clipping = { id, content };
    setClippings([clipping, ...clippings]);
  }, [clippings]);

  const handleWriteToClipboard = React.useCallback(() => {
    const [clipping] = clippings;
    if (clipping) writeToClipboard(clipping.content);
  }, [clippings]);

  React.useEffect(() => {
    ipcRenderer.on('create-new-clipping', addClipping);
    ipcRenderer.on('write-to-clipboard', handleWriteToClipboard);
  }, [addClipping, clippings, handleWriteToClipboard]);

  return (
    <Container fluid>
      <Row className="controls">
        <Button type="button" onClick={addClipping}>
          Copy from Clipboard
        </Button>
      </Row>
      <Row className="content">
        <div className="clippings-list">
          {clippings.map(({ content, id }) => (
            <Clipping content={content} key={id} />
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
