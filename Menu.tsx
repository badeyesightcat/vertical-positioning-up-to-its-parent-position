import React, { useState, useRef, CSSProperties, useCallback } from 'react';

export default function Menu() {
  const [clicked, setClicked] = useState<number | null>(null);
  const [subClicked, setSubClicked] = useState<number | null>(null);
  
  const [dynamicStyle, setDynamicStyle] = useState<CSSProperties | null>(null);
  const [subDynamicStyle, setSubDynamicStyle] = useState<CSSProperties | null>(null);

  const refsArray = useRef<HTMLButtonElement[] | null[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const subModalRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = useCallback((index: number) => {
    const vh = refsArray.current[0]!.closest('html')!.getBoundingClientRect().height;
    const clickedPosition = refsArray && refsArray.current && refsArray.current[index - 1]!.getBoundingClientRect();
    const modalHeight = modalRef && modalRef.current! && modalRef.current.getBoundingClientRect().height; 

    if ((vh - clickedPosition.top) < modalHeight) {
      setDynamicStyle({ bottom: 0 });
    } else {
      setDynamicStyle({ top: clickedPosition.top });
    }

    setSubClicked(null);
    setClicked(index);
  }, []);

  const handleModalClick = useCallback((index: number) => {
    const vh = refsArray.current[0]!.closest('html')!.getBoundingClientRect().height;
    const clickedPosition = modalRef && modalRef.current! && modalRef.current.getBoundingClientRect();
    const subModalHeight = subModalRef && subModalRef.current! && subModalRef.current.getBoundingClientRect().height;

    console.log(clickedPosition, subModalHeight);
    if ((vh - clickedPosition.top) < subModalHeight) {
      setSubDynamicStyle({ bottom: 0 });
    } else {
      setSubDynamicStyle({ top: 0 });
    }

    setSubClicked(index);
    setClicked(index);
  }, []);
 
  return <div style={menuStyle}>
    {[1,2,3,4,5,6,7,8,9,10].map((item, i) => (
      <div 
        key={`order${i}`} 
        id={`order${i}`}
      >
        <button
          ref={ref => { refsArray.current[i] = ref; }}
          onClick={() => handleButtonClick(item)}
          style={buttonStyle}
        >
          {`No. ${item} button`}
        </button>
        {clicked === item && <div
          style={{...modalStyle, ...dynamicStyle}}
          onClick={() => handleModalClick(item)}
          ref={modalRef}
        >
          I am {`${item}'s`} modal.
          {(subClicked === item) && <div style={{...subModalStyle, ...subDynamicStyle}} ref={subModalRef}>
            I am {`${item}'s`} sub modal.
          </div>}
        </div>}
      </div>
    ))}
  </div>;
};

const menuStyle = {
  position: 'relative',
  height: '100vh',
  width: '200px',
} as const;

const buttonStyle = {
  display: 'block',
  height: '10vh',
  width: '100%',
};

const modalStyle = {
  position: 'absolute',
  width: '160px',
  height: '100px',
  backgroundColor: '#fff',
  border: '1px solid #000',
  left: 'calc(100% + 12px)',
} as const;

const subModalStyle = {
  position: 'absolute',
  width: '120px',
  height: '120px',
  backgroundColor: '#000',
  color: '#fff',
  left: 'calc(100% + 12px)',
  border: '2px solid red',
} as const;
