import React from 'react'

interface InputFileProp{
    classname ?: string;
    id: string;
    name:string;
    onchange ?: ()=>void;
}
const InputFile:React.FC<InputFileProp> = ({classname,id,name,onchange}) => {
  return (
    <div>
      <input type='file' className={classname} id={id} name={name} onChange={onchange}>
      </input>
    </div>
  )
}

export default InputFile
