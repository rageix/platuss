import { PropsWithChildren, useEffect, useState } from 'react';
import TagForm from '@/components/tagForm/TagForm';
import FormDialog from '@/components/formDialog/FormDialog';

export interface Props extends PropsWithChildren {
  show?: boolean;
  id?: string;
}

const defaultProps: Props = {
  show: false,
};

export default function TagDialog(props: Props) {
  props = { ...defaultProps, ...props };

  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <FormDialog
      title={props.id ? 'Edit Tag' : 'Create Tag'}
      show={show}
    >
      <TagForm id={props.id} />
    </FormDialog>
  );
}
