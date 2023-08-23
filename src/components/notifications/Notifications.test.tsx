import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import emitter from '@/lib/emitter';
import Notifications from "./Notifications";
import QueryWrapper from "../../../__tests__/QueryWrapper";

describe('<Notifications />', () => {
  it('works correctly', async () => {
    render(<QueryWrapper>
      <Notifications/>
    </QueryWrapper>);

    const notifications =
      screen.getByTestId<HTMLInputElement>('notificationArea');

    expect(notifications.querySelectorAll('.error')).toHaveLength(0);

    // create new notification
    act(() => {
      emitter.emitNotificationError('Something bad happened');
    });

    await waitFor(() => {
      expect(notifications.querySelectorAll('.error')).toHaveLength(1);
    });

    act(() => {
      emitter.emitNotificationError('Something bad happened');
      emitter.emitNotificationError('Something bad happened');
    });

    await waitFor(() => {
      expect(notifications.querySelectorAll('.error')).toHaveLength(3);
    });

    // click all close buttons on the notifications
    let closeButtons = notifications.querySelectorAll('.error .close');

    while (closeButtons.length > 0) {
      fireEvent.click(closeButtons[0]);

      closeButtons = notifications.querySelectorAll('.error .close');
    }

    await waitFor(
      () => {
        expect(notifications.querySelectorAll('.error')).toHaveLength(0);
      },
    );
  });
});
