import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import {log_in} from '../actions/auth';
// const BACKEND = "http://localhost:3030";
const BACKEND = "https://fit-journal-back.herokuapp.com";

export default function Sign_in_page(){       
    const dispatch = useDispatch();

    const validate= (values) =>{
        const errors = {};
        if(values.password.length < 6){ errors.password = "Password must be 6 characters or longer"}
        if(!values.email){ errors.email = "Required"}
        if(!values.password){ errors.password = "Required"}
    }
    
    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid Email')
            .min(6, 'Too Short ')
            .max(255, 'Too Long ')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short')
    })

    return(
        <div className="sign-in-page">
           <div className="sign-in-page-card">
               <div className="sign-in-page-logo"></div>
               <div className="sign-in-page-header">Sign in to Your account</div>
               
               <Formik
                initialValues={{ email:'', password:'' }}
                validationSchema={SigninSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    console.log(values['email']);
                    console.log(values['password']);
                    axios.post(BACKEND+"/user/login", {
                        email: values['email'],
                        password: values['password']
                    }).then(({data,status})=>{
                        console.log(data);
                        setSubmitting(false);
                        localStorage.setItem("token", data)
                        if(status==200) {
                            dispatch(log_in());
                        }
                    }, (error) =>{
                        alert(error);
                        setSubmitting(false);
                    })
                    }, 400);
                }}
                >
                {({ isSubmitting, errors }) => (
                    <Form>
                    <label for="email" className="sign-in-page-label">Email</label>
                    <Field type="text" name="email" className="sign-in-page-input" id="email"/>
                    <ErrorMessage name="email" component="div" />
                    <label for="password" className="sign-in-page-label">Password</label>
                    <Field type="password" name="password" className="sign-in-page-input" id="password"/>
                    <ErrorMessage name="password" component="div" />
                    {/* <Link to="/content"> */}
                        <button type="submit" disabled={isSubmitting} className="sign-in-page-button">
                            Submit
                        </button>
                    {/* </Link> */}
                    </Form>
                )}
                </Formik>

                {/*                
               <label for="email" className="sign-in-page-label">Email</label>
               <input type="text" className="sign-in-page-input" id="email"></input>
               <label for="password" className="sign-in-page-label">Password</label>
               <input type="text" className="sign-in-page-input" id="password"></input>
               <Link to="/content">
                    <button className="sign-in-page-button">SIGN IN</button>
                </Link> */}

            </div>
        </div>
    )
}
