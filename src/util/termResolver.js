export const mapActualToReported = str => {
  if (str === 'actual') {
    return 'reported'
  }
  if (str === 'value') {
    return 'offense'
  }
  return str;
}

export default mapActualToReported
