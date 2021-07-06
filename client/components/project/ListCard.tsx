import React from 'react';

interface Props {
  content: string;
}

const ListCard = ({ content }: Props) => {
  return (
    <div className="project-pannel-card">
      <p>{content}</p>
    </div>
  );
};

export default ListCard;
