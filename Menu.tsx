import React, { useState, useRef, CSSProperties, useCallback } from 'react';

export default function Menu() {
  const [clicked, setClicked] = useState<number | null>(null);
  const [subClicked, setSubClicked] = useState<number | null>(null);
  
  const [dynamicStyle, setDynamicStyle] = useState<CSSProperties | null>(null);

  const refsArray = useRef<HTMLButtonElement[] | null[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = useCallback((index: number) => {
    const vh = refsArray.current[0]!.closest('html')!.getBoundingClientRect().height;
    const clickedPosition = refsArray && refsArray.current && refsArray.current[index - 1]!.getBoundingClientRect();
    const modalHeight = modalRef && modalRef.current! && modalRef.current.getBoundingClientRect().height; 

    console.log(vh - clickedPosition.top, modalHeight);
    if ((vh - clickedPosition.top) < modalHeight) {
      setDynamicStyle({ bottom: 0 });
    } else {
      setDynamicStyle({ top: clickedPosition.top });
    }

    setSubClicked(null);
    setClicked(index);

  }, []);

  const handleModalClick = (index: number) => {
    setSubClicked(index);
  };
 
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
        {clicked === item &&
        <div
          style={{...modalStyle, ...dynamicStyle}}
          onClick={() => handleModalClick(item)}
          ref={modalRef}
        >
            I am {`${item}'s`} modal.
            {(clicked === item) && (subClicked === item) && <div style={subModalStyle}>
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
  height: '200px',
  backgroundColor: '#fff',
  border: '1px solid #000',
  // top: 0,
  left: 'calc(100% + 12px)',
} as const;

const subModalStyle = {
  position: 'absolute',
  width: '120px',
  height: '120px',
  backgroundColor: '#000',
  color: '#fff',
  left: 'calc(100% + 12px)',
} as const;