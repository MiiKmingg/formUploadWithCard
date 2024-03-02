import React, { ChangeEvent } from "react";

interface InputEmailProp {
  defaultvalue?:string;
  value?: string;
  placeholder?: string;
  classname?: string;
  id: string;
  name: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputEmail: React.FC<InputEmailProp> = ({
  value,
  placeholder,
  classname,
  id,
  name,
  onchange,
  defaultvalue,
}) => {
  return (
    <div>
      <input
        type="email"
        value={value}
        placeholder={placeholder}
        className={classname}
        id={id}
        name={name}
        onChange={onchange}
        defaultValue={defaultvalue}
      />
    </div>
  );
};

export default InputEmail;
