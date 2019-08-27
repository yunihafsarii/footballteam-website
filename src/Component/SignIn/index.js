import React, { Component } from 'react'
import FormField from '../../Component/ui/formField'
import { validate } from '../../Component/ui/misc'
import { firebase } from '../../firebase'
import { thisExpression } from '@babel/types';

 class SignIn extends Component {
    
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
                },
                password:{
                    element:'input',
                    value:'',
                    config:{
                        name:'password_input',
                        type:'password',
                        placeholder:'Enter your password'
                    },
                    validation:{
                        required: true,
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
                
                firebase.auth()
                .signInAndRetrieveDataWithEmailAndPassword(
                    dataToSubmit.email,
                    dataToSubmit.password
                ).then(()=>{
                    console.log('USER IS AUTH')
                }).catch((error)=>{
                    this.setState({
                        formError: true
                    })
                })
    
            }else{
                this.setState({
                    formError: true 
                })
            }
        }

        render() {
        return (
            <div className='container'>
                <div className='signin_wrapper' style={{margin:'100px'}}>
                    <form onSubmit={(event)=> this.submitForm(event)}>

                        <h2>Please Login</h2>

                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element)=> this.updateForm(element)}
                        />

                        <FormField
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element)=> this.updateForm(element)}
                        />

                        {/* check if state.formError = true then show error label */}
                        {this.state.formError ? 
                            <div className='error_label'>Something is wrong, try again</div>
                            : null}

                        <button onClick={(event)=>this.submitForm(event) }>Log In</button>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default SignIn;
