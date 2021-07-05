import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const Index = (props: Props) => {
  const router = useRouter();
  const username = router.query["username"];

  return <div>{username}</div>;
};

export default Index;
