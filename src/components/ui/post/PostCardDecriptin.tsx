/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */

'use client'

import { useEffect, useState } from 'react';

const PostCard = ({ text } : any) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const truncatedDescription = truncateText(text, 100); // Limit to 100 characters for example

  return (
    <div>
      {isClient ? (
        <div
          className="text-md text-default-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: truncatedDescription }}
        />
      ) : null}
    </div>
  );
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'; // Add ellipsis for truncated text
  }
  return text;
};

export default PostCard;
