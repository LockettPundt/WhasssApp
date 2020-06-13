import React, { useState } from 'react';
import { Text, Box } from 'grommet';
import dateFormat from '../utils/dateFormat';


const Message = ({
  author, userName, messageTime, message,
}) => (

  <Box
    flex="grow"
    direction={author === userName ? 'row-reverse' : 'row'}
    margin={{
      vertical: 'small',
      horizontal: 'small',
    }}
  >
    <Box
      direction="column"
    >
      <Text
        margin={{
          horizontal: 'small',
        }}
        size="xsmall"
      >
        {author === userName ? '' : `${author}`}
      </Text>
      <Box
        pad="xsmall"
        background={{
          color: author === userName ? '#C0FFF4' : '#FFC0CB',
        }}
        round="small"
      >
        <Text
          margin={{
            horizontal: 'small',
          }}
        >

          {message}
        </Text>
        <Text
          margin={{
            horizontal: 'small',
          }}
          size="xsmall"
        >
          {dateFormat(messageTime)}
        </Text>
      </Box>
    </Box>
  </Box>
);


export default Message;
