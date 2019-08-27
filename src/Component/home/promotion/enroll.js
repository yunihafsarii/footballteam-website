import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import FormField from '../../ui/formField'
import { validate } from '../../ui/misc'

import { firebasePromotions } from '../../../firebase'


class Enroll extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage:''
            }
        }
    }

    // element (event,id). changing state directly form here
    updateForm(element){
         const newFormdata = {...this.state.formdata}
         const newElement = { ...newFormdata[element.id]}

         // update value here
         newElement.value = element.event.target.value

        let validData = validate(newElement)
        // update valid here (true or false [0])
        newElement.valid = validData[0]
        // update valid message 
        newElement.validationMessage = validData[1]

        // update formdata
         newFormdata[element.id] = newElement

         this.setState({
             formError: false,
             formdata: newFormdata
         })
    }

    // reset everthing if all ok
    resetFormSuccess(type){
        const newFormdata = {...this.state.formdata}

        for(let key in newFormdata){
            newFormdata[key].value = ''
            newFormdata[key].valid= false
            newFormdata[key].validationMessage=''
        }

        this.setState({
            formError:false,
            formdata:newFormdata,
            formSuccess: type ? 'Congratulations' : 'Already on the database'
        })
        this.successMessage()
    }

    successMessage(){
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
        },2000)
    }

    submitForm(event){
        event.preventDefault()

        // submit key (email='yuni@gmail.com') value, check first if everthing is valid (its in the state, email.valid = true)
        let dataToSubmit = {}
        let formIsValid = true

        for(let key in this.state.formdata){
            dataToSubmit[key]= this.state.formdata[key].value
            formIsValid = this.state.formdata[key].valid && formIsValid
        }

        if(formIsValid){
            // check if the user is already in database
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
            .then((snapshot)=>{
                // if its null no same email in firebase
                if(snapshot.val()==null){
                    // push to firebase
                    firebasePromotions.push(dataToSubmit)
                    this.resetFormSuccess(true)
                } else{
                    this.resetFormSuccess(false)
                }
            })

        }else{
            this.setState({
                formError: true 
            })
        }
    }

    render() {
        return (
            <Fade>
                <div className='enroll_wrapper'>
                    <form onSubmit={ (event)=> this.submitForm(event) }>
                        <div className='enroll_title'>
                            Enter your email
                        </div>
                        <div className='enroll_input'>
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element)=> this.updateForm(element)}
                            />
                            {/* check if state.formError = true then show error label */}
                            {this.state.formError ? 
                            <div className='error_label'>Something is wrong, try again</div>
                            : null}
                            {/* this.state.formSuccess,congra or already on database, check the logic above */}
                            <div className='success_label'>{this.state.formSuccess}</div>
                            <button onClick={(event)=>this.submitForm(event) }>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}

export default Enroll;
