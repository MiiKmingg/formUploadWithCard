import React, { ReactNode } from 'react'

interface FloatingButtonProp{
    children : ReactNode;
    classname ?: string;
    position ?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    onclick ?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const FloatingButton:React.FC<FloatingButtonProp> = ({children , classname , position = 'top-left' , onclick}) => {
    const align = (position: string) =>{
        switch(position){
            case "top-left" : 
                return 'top-5 left-5';
            case "top-right" :
                return 'top-5 right-5';
            case "bottom-left" :
                return 'bottom-5 left-5';
            case "bottom-right" :
                return 'bottom-5 right-5';
            default : 
                return 'top-5 left-5';
        }
    }
    const setPosition = align(position);
    const buttonStyle = `${classname} ${setPosition} fixed`;
  return (
    <div>
      <button className={buttonStyle} onClick={onclick}>{children}</button>
    </div>
  )
}

export default FloatingButton
