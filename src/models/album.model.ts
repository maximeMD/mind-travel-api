class Album {
  public key: string;
  public pictures: string[];
  public thumbnail: string;

  // constructor(key: string, pictures: string[], thumbnail: string) {
  //   this.key = key;
  //   this.pictures = pictures;
  //   this.thumbnail = thumbnail;
  // }

  constructor() {
    this.key = '';
    this.pictures = [];
    this.thumbnail = '';
  }
}
export default Album;
