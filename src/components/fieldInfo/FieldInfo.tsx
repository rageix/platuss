import { FieldApi } from '@tanstack/form-core';

export default function FieldInfo({ field }: { field: FieldApi<any, any> }) {
  return (
    <>
      {field.state.meta.touchedError ? (
        <em>{field.state.meta.touchedError}</em>
      ) : null}{' '}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}
