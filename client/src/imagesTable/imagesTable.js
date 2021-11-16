import {Table} from 'react-bootstrap';
import React from 'react';


function ImagesTable(props){
    return(
        <Table classname="mx-auto">
            <tbody>{props.imagesList.map((img) => <ImageRow key = {img.id} image ={img}/>)}</tbody>
        </Table>
    )
}

function ImageRow(props) {

    return <tr><ImageRowData img = {props.image}/></tr>
}

function ImageRowData(props){
    return (
        <td><img className = "ml-auto" src = {process.env.PUBLIC_URL +'templates/'+ props.img.name} alt ={"4"}></img>
        <h1>{props.img.name}</h1> </td> 
    )
}

export default ImagesTable;