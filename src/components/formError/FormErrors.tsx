import { ValidationErrorItem } from 'joi';

interface Props {
  errors: ValidationErrorItem[];
  id?: string
}

export default function FormErrors(props: Props) {

  return (
    <div id={props.id}>
      {props.errors.map((v, i) => (
        <p
          key={i}
          className="mt-2 text-sm text-red-600"
        >
          {v.message}
        </p>
      ))}
    </div>
  );
}
