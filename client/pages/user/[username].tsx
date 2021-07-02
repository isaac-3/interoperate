import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const username = (props: Props) => {
  const router = useRouter();

  return <div>username</div>;
};

export default username;
