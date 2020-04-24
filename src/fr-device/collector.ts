/**
 * @class Collector - base class for FRDevice
 * Generic collector functions for collecting a device profile attributes
 */
class Collector {
  /**
   * @method reduceToObject - goes one to two levels into source to collect attribute
   * @param props - array of strings; can use dot notation for two level lookup
   * @param src - source of attributes to check
   */
  reduceToObject(props: string[], src: any): { [key: string]: string } {
    return props.reduce((prev, curr) => {
      if (curr.includes('.')) {
        const propArr = curr.split('.');
        const prop = src[propArr[0]] && src[propArr[0]][propArr[1]];
        prev[propArr[1]] = prop != undefined ? prop : '';
      } else {
        prev[curr] = src[curr] != undefined ? src[curr] : null;
      }
      return prev;
    }, {} as { [key: string]: string });
  }

  /**
   * @method reduceToString - goes one level into source to collect attribute
   * @param props - array of strings
   * @param src - source of attributes to check
   */
  reduceToString(props: string[], src: any): string {
    return props.reduce((prev, curr) => {
      prev = `${prev}${src[curr].filename};`;
      return prev;
    }, '');
  }
}

export default Collector;
