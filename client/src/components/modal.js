

import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { DisplayMemeModal } from './memeScreen';
import { Col, Row } from 'react-bootstrap';
import { AddMeme, CopyMeme } from './addMeme';


function ShowImageModal(props) {
  
  let pos = props.memes.map(function (e) { return e.id }).indexOf(props.meme);       /*trovo la posizione corrispondente all'id dell'immagine selezionata */
  
  

  let titleV = props.memes.map(function (m) { return m.title });  /* vettore di titoli*/
  let title = titleV[pos];

  let userV = props.memes.map(function (m) { return m.user });
  let autor = userV[pos];

  let idV = props.memes.map(function (m) { return m.id });
  let id = idV[pos];
  

  

  const handleClick = (event) => {
    props.manageShow(false);
  }

  const handleDeleteClick = (event) => {
    
    props.deleteMeme(id);
    props.manageShow(false);
  }

  const handleCopyClick = (event) => {
    props.setCopyModal(true);
    props.manageShow(false);
    props.setMemeIDToCopy(id);
  }

  return (

    <Modal show={props.show} onHide={handleClick} meme={props.meme} size="lg">
        <Modal.Header closeButton onClick={handleClick}>
            <Modal.Title>Titolo: {title}  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <React.Fragment>
                {props.logged ? <ShowMemeLogged meme={props.memes[pos]}></ShowMemeLogged> : <ShowMemeNotLogged meme={props.memes[pos]}></ShowMemeNotLogged>}
        </React.Fragment>
        </Modal.Body>
        <Modal.Footer>
            {props.logged ?
                <React.Fragment>
                    <Button variant="primary" onClick={handleCopyClick}>
                        Copia Meme
                    </Button>
                    {props.userName === autor ?

                    <Button variant="danger" to="" onClick={handleDeleteClick}>
                        Delete Meme
                    </Button> : <React.Fragment />
                    }
                    </React.Fragment> :

                    <Button variant="secondary" onClick={handleClick}>
                        Close
                    </Button>
              }
          </Modal.Footer>
      </Modal>
  );

}

function ShowMemeLogged(props) {
    let visibility = props.meme.protect;
    let visibilityString = "";
    if (visibility === 1) {
        visibilityString = "protected";
      }
    else {
        visibilityString = "public";
      }

  switch (props.meme.fields) {
    case 1:
      return (
        <Row>
          <Col>
            <DisplayMemeModal meme={props.meme} mode={"big"}></DisplayMemeModal>
          </Col>
          <Col>
            <h4 className="text-left" >Autor: {props.meme.user}</h4>
            <h4 className="text-left">Text1: {props.meme.text1}</h4>
            <h4 className="text-left">Font: {props.meme.font}</h4>
            <h4 className="text-left">Color: {props.meme.color}</h4>
            <h4 className="text-left"> Visibility: {visibilityString}</h4>
          </Col>
        </Row>
      );
    case 2:
      return (<Row>
        <Col>
          <DisplayMemeModal meme={props.meme} mode={"big"}></DisplayMemeModal>
        </Col>
        <Col>
          <h4 className="text-left" >Autor: {props.meme.user}</h4>
          <h4 className="text-left">Text1: {props.meme.text1}</h4>
          <h4 className="text-left">Text2: {props.meme.text1}</h4>
          <h4 className="text-left">Font: {props.meme.font}</h4>
          <h4 className="text-left">Color: {props.meme.color}</h4>
          <h4 className="text-left"> Visibility: {visibilityString}</h4>
        </Col>
      </Row>);
    case 3:
      return (<Row>
        <Col>
          <DisplayMemeModal meme={props.meme} mode={"big"}></DisplayMemeModal>
        </Col>
        <Col>
          <h4 className="text-left" >Author: {props.meme.user}</h4>
          <h4 className="text-left">Text1: {props.meme.text1}</h4>
          <h4 className="text-left">Text2: {props.meme.text2}</h4>
          <h4 className="text-left">Text3: {props.meme.text3}</h4>
          <h4 className="text-left">Font: {props.meme.font}</h4>
          <h4 className="text-left">Color: {props.meme.color}</h4>
          <h4 className="text-left"> Visibility: {visibilityString}</h4>
        </Col>
      </Row>);
      default: 
          return(<React.Fragment></React.Fragment>);

  }

}

function ShowMemeNotLogged(props) {
  
  return (
    <Row>
      <Col>
        <DisplayMemeModal meme={props.meme} mode={"big"}></DisplayMemeModal>
      </Col>
      <Col>
        <h4 className="text-left" >Author: {props.meme.user}</h4>
      </Col>
    </Row>
  )
}

function NewMemeModal(props) {


 

  

  const handleClick = (event) => {
    props.manageShow(false);
    
    
  }

  return (
    <Modal show={props.show} onHide={props.onHide} images={props.images} size="lg">
      <Modal.Header closeButton onClick={handleClick}>
        <Modal.Title> <h1>New Meme</h1>  </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddMeme images={props.images} addOrUpdateMeme={props.addOrUpdateMeme} userName={props.userName}></AddMeme>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClick}>
          Close
                  </Button>
      </Modal.Footer>
    </Modal>
  );
}

function CopyMemeModal(props) {

  const handleClick = (event) => {
    props.manageShow(false);
    
  }
 
  return (<Modal show={props.show} onHide={props.onHide} images={props.images} size="lg">
    <Modal.Header closeButton onClick={handleClick}>
      <Modal.Title> <h1>Copy Meme</h1>  </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <CopyMeme memeIDToCopy={props.memeIDToCopy} memes={props.memes} userName={props.userName} addOrUpdateMeme={props.addOrUpdateMeme}></CopyMeme>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClick}>
        Close
        </Button>
    </Modal.Footer>
  </Modal>);

}
export { ShowImageModal, NewMemeModal, CopyMemeModal };
