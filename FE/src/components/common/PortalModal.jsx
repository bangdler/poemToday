import ReactDOM from 'react-dom';

export default function PortalModal({ children }) {
  const modalRoot = document.querySelector('#modal-root');

  return ReactDOM.createPortal(children, modalRoot);
}
