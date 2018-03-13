export const mapActualToReported = str => {
  if (str === 'actual') {
    return 'reported'
  }
  if(str == 'value'){
    return 'incident'
  }
  return str;
}

export default mapActualToReported
