import css from './ContactList.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';


export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [contactToDeleteId, setContactToDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (!visibleContacts?.length && !error & !isLoading) {
    return <p>There is no contacts yet.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul className={css.contactList}>
      {visibleContacts.map(({ id, name, number }) => {
        return (
          <li className={css.contactListItem} key={id}>
            <span className={css.contactItem}>
              {name} : {number}
            </span>

            <button
              className={css.deleteBtn}
              type="button"
              onClick={() => {
                setContactToDeleteId(id);
                dispatch(deleteContact(id)).then(() => {
                  setContactToDeleteId(null);
                });
              }}
              disabled={isLoading && contactToDeleteId === id}
            >
              <RiDeleteBinLine />
            </button>
          </li>
        );
      })}
    </ul>
  );
};
