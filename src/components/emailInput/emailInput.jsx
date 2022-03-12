import React,{ useState, useEffect, useRef } from 'react';
import '../../styles/emailInput.css';
import emails from './emailListMock';

const Tag = props => <span className={`tag${props.isValid ? '': ' error'}`} {...props} />
const Delete = props => <button className={`${props.isValid ? 'delete': 'error'}`} {...props} />

const EmailInput = () => {

    const [currentEmail, setCurrentEmail] = useState('');
    const [selectedEmails, setSelectedEmails] = useState([]);

    const [x, setX] = useState()
    const update = (e) => {
        let bounds = document.getElementById('email-container').getBoundingClientRect();
      setX(e.clientX - bounds.left)
    }

    useEffect(
        () => {     
          document.getElementById('email-input').addEventListener('click', update)
          return () => {
            document.getElementById('email-input').removeEventListener('click', update)
          }
        },
        [setX]
      )

    const handleAddEmail = (email) => {
        const selectedEmailsCopy = [...selectedEmails];
        selectedEmailsCopy.push(email);
        setCurrentEmail('');
        setSelectedEmails(selectedEmailsCopy);
    }
    const handleRemoveEmail = (email) => {
        const selectedEmailsCopy = [...selectedEmails].filter(e => e !== email);
        setSelectedEmails(selectedEmailsCopy); 
    }
    const handleInputChange = (e) => {
        setCurrentEmail(e.target.value);
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter' || e.key === 'Tab'){
            e.preventDefault();
            setCurrentEmail('');
            const selectedEmailsCopy = [...selectedEmails];
            selectedEmailsCopy.push(currentEmail);
            setSelectedEmails(selectedEmailsCopy);
        }
    }

    const validateEmail = (email) => {
        return !!String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    return ( 
        <div className='email-container' id='email-container'>
        <div className="tags-input">
            {selectedEmails.map((email, index) => (
                <Tag key={index} isValid={validateEmail(email)}>
                    {email}
                    <Delete onClick={()=>handleRemoveEmail(email)} isValid={validateEmail(email)}/>
                </Tag>
            ))}           
            <input
                id="email-input"
                type="text" 
                className="email-input"
                placeholder='Enter recipients...'
                value={currentEmail}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                id='email-input'
            />           
        </div>
        <div className='emails-box' id='emails-box' style={{marginLeft: x}}> 
        <ul>
            {emails.filter(x=>currentEmail&&x.startsWith(currentEmail)).map((email, index)=>(<li onClick={()=>handleAddEmail(email)} key={index}>{email}</li>))}
        </ul>
    </div>
    </div>
     );
}
 
export default EmailInput;