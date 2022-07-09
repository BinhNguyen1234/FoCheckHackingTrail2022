import {
  navigateToPDP,
} from "../../utils/navigate";

Page({
  onScan(e) {
    my.scan({
      success: (res) => {
        const content = res.toString()
        my.alert({
          title: 'Found',
          content: content,
          buttonText: 'Alert Button',
          success: () => {
            console.log('Success');
            navigateToPDP(content)
          },
          fail: () => {
            console.log('Fail');
          },
          complete: () => {
            console.log('Complete');
          }
        })
      },
      fail: (e) => {
        console.log(e);
        my.alert({
          title: 'Lỗi rồi sếp ơi',
          content: e
        })
      }
    });
  }
});