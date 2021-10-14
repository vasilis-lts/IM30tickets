export function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function handleSetRelayResult(name, port, data) {
  if (data) {
    // alert('Relay set port ' + port + ' success');
  }
  else {
    // alert('Relay set port ' + port + ' FAILURE');
  }
}

export function handleGetRelayResult(name, port, data) {
  // if (port === 1 && data === true) {
  //   // person went through the tourniquet, process next
  //   clearInterval(intervalHandle);
  //   // ProcessNext();
  // }
  // pollInputRelay1Count++;
  // if (pollInputRelay1Count >= 100) {
  //   clearInterval(intervalHandle);
  //   // GoToErrorPage();
  // }
}
