import React from 'react';
import { Link } from 'react-router-dom'

export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding:'5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            ...props.add
        }}
    > {props.children}
    </div>

    if(props.link){
        return (
            <Link to={props.linkto}>
                {template}
            </Link>
        );
    } else {
        return template
    }  
};

// fetch the data from firebase and turn that into array of object
export const firebaseLooper = (snapshot) => {
    const data = []
    snapshot.forEach((childSnapshot) =>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data
}

export const reserveArray = (actualArray) => {
    let reservedArray = []

    for (let i=actualArray.length-1;i>=0;i--){
        reservedArray.push(actualArray[i])
    }

    return reservedArray
}

export const validate = (element) => {
    let error = [true,'']

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Must be a valid email' : ''}`
        error = !valid ? [valid,message] : error
    }

    if(element.validation.required){
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'This field is required' : ''}`
        error = !valid ? [valid,message] : error
    }

    return error
}