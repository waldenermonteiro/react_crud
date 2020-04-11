import swal from 'sweetalert'
const alertSuccess = (message) => {
  swal({
    title: message,
    icon: "success",
  })
}
const alertDanger = (message) => {
  const uniqueMessage = message.message || message
  if (Array.isArray(message)) {
    setMultipleNotifyDanger(message)
  } else {
    setUniqueNotifyDanger(uniqueMessage)
  }
}
const setUniqueNotifyDanger = (message) => {
  swal({
    title: message,
    icon: "error",
  })
}
const setMultipleNotifyDanger = (messages) => {
  messages.forEach(message => {
    this.setUniqueNotifyDanger(message.errorMessage)
  })
}
const verificationAlert = ({ id, message, nameModule }, callback) => {
  swal({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        callback(id).then(() => {
          swal(`Poof! Your imaginary ${nameModule} has been deleted!`, {
            icon: "success",
          });
        }).catch((err) => {
          alertDanger(err)
        });
      } else {
        swal(`Your imaginary ${nameModule} is safe!`);
      }
    });
}
export {
  alertSuccess,
  alertDanger,
  verificationAlert
}