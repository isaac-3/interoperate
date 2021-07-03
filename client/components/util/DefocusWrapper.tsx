import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  defocus: boolean;
  className: string;
  callBack: Function;
}

const DefocusWrapper = ({ children, defocus, className, callBack }: Props) => {
  const defocusWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!defocusWrapper.current?.contains(e["target"] as Node)) {
        callBack();
      }
    };

    if (defocus) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      if (defocus) {
        document.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div className={className} ref={defocusWrapper}>
      {children}
    </div>
  );
};

export default DefocusWrapper;
