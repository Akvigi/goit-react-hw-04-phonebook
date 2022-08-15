import React, {useEffect, useState} from "react";
import PhoneBookForm from "./PhoneBook/PBForm";
import List from "./PhoneBook/PBList";
import PBSearch from "./PhoneBook/PBSearch";
import Section from "./Section/Section";
import { ContentContainer, PageContainer } from "./styled-comp/styled";

const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contactlist")) ?? [])
  const [filter, setFilter] = useState('')
  
  // useEffect(() => {
  //   const parsed = JSON.parse(localStorage.getItem("contactlist"))
  //   if (parsed.length !== 0) setContacts(parsed)  
  // }, [])

  useEffect(() => {
    const string = JSON.stringify(contacts)
    localStorage.setItem("contactlist", string)
  }, [contacts])

   const renderContacts = (newContact) => {
    if (contacts) {
      setContacts(prevState => [...prevState, newContact])
    } else {
      setContacts([newContact])
    }
  }

  const onFilter = () => {
    if (filter) {
      const filterredArray = contacts.filter(({ name }) => name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
      return filterredArray
    } 
    return contacts
  }

  const isExist = (item) => {
    let exist = false
    if (contacts) {
      contacts.forEach(cont => {
        if (cont.name === item.name) {
          return exist = true
        }
      })
    }
    return exist
  }

  const onDelete = (id) => {
    const toUpdate = contacts.filter(elem => elem.id !== id)
    setContacts(toUpdate)
  }

  const array = onFilter()
    return (
    <PageContainer>
      <ContentContainer>
          <Section title="Phonebook">
            <PhoneBookForm pushC={renderContacts} isExist = {isExist} />
          </Section>
          <Section title="Contacts">
            <PBSearch array={array} onChange = {(e) => setFilter(e.currentTarget.value)}/>
            <List array={array} onDelete = {onDelete} />
          </Section>
        </ContentContainer>
      </PageContainer>
  );
}


export default App
