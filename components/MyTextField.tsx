interface MyTextFieldProps {
  name: string;
  borderColor: string;
  placeholder: string;
  onChange: Function;
}

export default function MyTextField(props: MyTextFieldProps) {
  return (
    <>
      <input
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ borderColor: props.borderColor, fontSize: "1rem" }}
        className="border-0 border-b-[1px] border-primary px-2 py-1 w-[80%] focus:outline-none"
      />
    </>
  );
}
