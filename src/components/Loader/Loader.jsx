import React from 'react';
import { Rings } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Rings
      height="240"
      width="240"
      color="#4fa94d"
      radius="6"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  );
}
