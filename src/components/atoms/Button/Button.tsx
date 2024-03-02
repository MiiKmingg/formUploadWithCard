import React, { ReactNode } from 'react'

interface ButtonProp{
    children: ReactNode;
    onclick ?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    classname: string;
}
const Button:React.FC<ButtonProp> = ({children , onclick, classname}) => {
  return (
    <div>
      <button onClick={onclick} className={classname}>{children}</button>
    </div>
  )
}

export default Button
