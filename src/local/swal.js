import swal from 'sweetalert';
import { isFunction } from 'util';

const showSwalNotification = (
  icon = 'success',
  title = 'Notification',
  text = 'You have a new notification'
) => {
  swal({
    title,
    text,
    icon,
  });
};

export const showSwalCallbackNotification = (
  title = 'Notification',
  text = 'A notification requires your attention',
  icon = 'warning', successCallback = null, failCallback = null, data
) => {
  swal({
    title,
    text,
    icon,
    buttons: true,
    dangerMode: true,
  })
    .then((response) => {
      if (response) {
        if (successCallback != null && isFunction(successCallback)) {
          successCallback(data);
        }
      } else if (failCallback != null && isFunction(failCallback)) {
        failCallback(data);
      }
    });
};

export default showSwalNotification;
