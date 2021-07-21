import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  defocus?: boolean;
  className: string;
  callBack: Function;
}

const DefocusWrapper = ({ children, defocus = true, className, callBack }: Props) => {
  const defocusWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!defocusWrapper.current?.contains(e["target"] as Node)) {
        callBack();
      }
    };

    if (defocus) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      if (defocus) {
        document.removeEventListener("mousedown", handleClick);
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
