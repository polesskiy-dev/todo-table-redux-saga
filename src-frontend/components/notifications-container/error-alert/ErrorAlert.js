import React from 'react'
import styles from './ErrorAlert.less'

const ErrorAlert = (props) =>
    <div className={`${styles['animated-appearance']} alert alert-danger`}>
        <strong>Danger!</strong> {props.message}
    </div>

export default ErrorAlert;