interface Props {
  errors: string[];
  id?: string;
  'data-testid'?: string;
}

export default function FormErrors(props: Props) {
  return (
    <div
      id={props.id}
      data-testid={props['data-testid']}
    >
      {props.errors.map((v, i) => (
        <p
          key={i}
          className="mt-2 text-sm text-red-600"
        >
          {v}
        </p>
      ))}
    </div>
  );
}
