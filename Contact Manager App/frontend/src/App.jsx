import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Contact Manager</h1>
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
        <button className="btn" onClick={openCreateModal}>Create New Contact</button>
        
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={closeModal}>&times;</span>
                <h5>{currentContact.id ? "Edit Contact" : "Create Contact"}</h5>
              </div>
              <div className="modal-body">
                <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
);

}

export default App;