import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className: string;
  callBack: Function;
}

const DefocusWrapper = ({ children, className, callBack }: Props) => {
  const defocusWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!defocusWrapper.current?.contains(e["target"] as Node)) {
        console.log("iccccc");
        callBack();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={className} ref={defocusWrapper}>
      {children}
    </div>
  );
};

export default DefocusWrapper;
