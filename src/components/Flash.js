import React from 'react';
import FlashMessage from 'react-flash-message'

const Message = () => (
  <FlashMessage duration={100000} persistOnHover={true}>
    <strong className="fixed bottom-0">I will disapper in 5 seconds!</strong>
  </FlashMessage>
)

export default Message;
