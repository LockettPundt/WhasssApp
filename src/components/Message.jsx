import React, { useState } from 'react';
import { Text, Box } from 'grommet';
import dateFormat from '../utils/dateFormat';


const Message = ({
  author, userName, messageTime, message,
}) => {
  const [date, setDate] = useState(messageTime);

  return (
    <Box
      direction={author === userName ? 'row-reverse' : 'row'}
      margin={{
        vertical: 'small',
      }}
    >
      <Text>
        {author === userName ? '' : `${author}:`}
        {' '}
        {message}
        {' '}
        {dateFormat(messageTime)}
      </Text>
    </Box>
  );
};


export default Message;
