import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {log_in} from '../actions/auth';
import { useHistory } from 'react-router-dom';
// const BACKEND = "http://localhost:3030";
const BACKEND = "https://fit-journal-back.herokuapp.com";

export default function Sign_up_page(){       
    const dispatch = useDispatch();
    const history = useHistory();

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid Email')
            .min(6, 'Too Short ')
            .max(255, 'Too Long ')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Too Short'),
        password_confirmation: Yup.string()
            .min(6, 'Too Short')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    return(
        <div className="sign-up-page">
           <div className="sign-up-page-card">
               <div className="sign-up-page-logo"></div>
               <div className="sign-up-page-header">Create account</div>
               
               <Formik
                initialValues={{ email:'', password:'', password_confirmation:'' }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                    axios.post(BACKEND + "/user/register", {
                        email: values['email'],
                        password: values['password'],
                        password_confirmation: values['password_confirmation']
                    }).then(({data,status})=>{
                        setSubmitting(false);
                        if(status==200) {
                            alert("account created succesfully");
                            history.push('/signin');
                        }
                    }, (error) =>{
                        alert(error.response.data);
                        setSubmitting(false);
                    })
                    }, 400);
                }}
                >
                {({ isSubmitting, errors }) => (
                    <Form>
                    <label for="email" className="sign-up-page-label">Email</label>
                    <Field type="text" name="email" className="sign-up-page-input" id="email"/>
                    <ErrorMessage name="email" component="div" />
                    <label for="password" className="sign-up-page-label">Password</label>
                    <Field type="password" name="password" className="sign-up-page-input" id="password"/>
                    <ErrorMessage name="password" component="div" />
                    <label for="password" className="sign-up-page-label">Password confirmation</label>
                    <Field type="password" name="password_confirmation" className="sign-up-page-input" id="password"/>
                    <ErrorMessage name="password_confirmation" component="div" />
                    {/* <Link to="/content"> */}
                        <button type="submit" disabled={isSubmitting} className="sign-up-page-button">
                            Submit
                        </button>
                    {/* </Link> */}
                    </Form>
                )}
                </Formik>

               {/* <label for="email" className="sign-up-page-label">Email</label>
               <input type="text" className="sign-up-page-input" id="email"></input>
               <label for="password" className="sign-up-page-label">Password</label>
               <input type="text" className="sign-up-page-input" id="password"></input>
               <label for="password_confirmation" className="sign-up-page-label">Password confirmation</label>
               <input type="text" className="sign-up-page-input" id="password_confirmation"></input>
               <Link to="/content">
                    <button className="sign-up-page-button">CREATE</button>
                </Link> */}
            </div>
        </div>
    )
}
